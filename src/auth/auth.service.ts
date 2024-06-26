import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable, ForbiddenException, Logger, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthDto } from '@app/auth/dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from '@app/auth/types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async createAccount(dto: AuthDto): Promise<Tokens> {
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
      data: { email: dto.email, mdp: hash, name: dto.name, adrPost: dto.adrPost, comment: dto.comment, hash: hash, hashedRt: hash },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.typeUser);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }
  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Accès refusé !');
    const passMatch = await argon2.verify(user.hash, dto.mdp);
    if (!passMatch) throw new ForbiddenException('Accès refusé !');
    const tokens = await this.getTokens(user.id, user.email, user.typeUser);
    await this.updateRtHash(user.id, tokens.refresh_token);
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
    const tokens = await this.getTokens(user.id, user.email, user.typeUser);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
  async getTokens(userId: number, email: string, typeUser: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      typeUser: typeUser
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon2.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
