import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
import { CreateAndAuthUserDto } from '@app/shared/dto/createAndAuthUser.dto';
import * as argon2 from 'argon2';
import { Tokens } from '@app/auth/types';
import { AccessContorlService } from '@app/shared/access-control.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private accessControlService: AccessContorlService,
  ) {}
  async createAccount(dto: CreateAndAuthUserDto): Promise<Tokens> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (userExists) {
      throw new ConflictException('Un utilisateur avec cette adresse mail existe déjà !');
    }
    const hash = await argon2.hash(dto.mdp);
    const newUser = await this.prisma.user.create({
      data: { email: dto.email, mdp: hash, name: dto.name, adrPost: dto.adrPost, comment: dto.comment, hashedRt: hash },
    });
    const tokens = await this.accessControlService.getTokens(newUser.id, newUser.email, newUser.name, newUser.adrPost, newUser.comment, newUser.typeUser);
    await this.accessControlService.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }
  async login(dto: CreateAndAuthUserDto): Promise<Tokens> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Accès refusé !');
    const passMatch = await argon2.verify(user.mdp, dto.mdp);
    if (!passMatch) throw new ForbiddenException('Accès refusé !');
    const tokens = await this.accessControlService.getTokens(user.id, user.email, user.name, user.adrPost, user.comment, user.typeUser);
    await this.accessControlService.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: '',
        },
      },
      data: {
        hashedRt: '',
      },
    });
  }
  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Accès refusé !');
    const rtMatches = await argon2.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Accès refusé !');
    const tokens = await this.accessControlService.getTokens(user.id, user.email, user.name, user.adrPost, user.comment, user.typeUser);
    await this.accessControlService.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
}
