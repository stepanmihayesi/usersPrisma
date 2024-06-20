import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthDto } from '@app/auth/dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from '@app/auth/types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
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
    return true;
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
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
  async createAccount(dto: AuthDto): Promise<Tokens> {
    const hash = await argon2.hash(dto.mdp);
    const newUser = await this.prisma.user.create({
      data: { email: dto.email, mdp: hash, hash: hash, hashedRt: hash },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }
  hashData(data: string) {
    return argon2.hash(data);
  }
  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
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
  refreshTokens() {}
}
