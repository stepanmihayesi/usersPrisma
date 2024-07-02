import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Role } from '@app/auth/enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from '@app/auth/types';
import * as argon2 from 'argon2';

interface IsAuthorizedParams {
  currentRole: Role;
  requiredRole: Role;
}

@Injectable()
export class AccessContorlService {
  private hierarchies: Array<Map<string, number>> = [];
  private priority: number = 1;

  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.buildRoles([Role.USER, Role.ADMIN]);
  }

  /**
   * La méthode buildRoles permet de créer une hiérarchie de rôles entre un ensemble de rôles spécifié.
   * Les rôles doivent être spécifiés de l'utilisateur le moins privilégié au plus privilégié
   * @param roles Tableau contenant la liste des rôles
   */
  private buildRoles(roles: Role[]) {
    const hierarchy: Map<string, number> = new Map();
    roles.forEach((role) => {
      hierarchy.set(role, this.priority);
      this.priority++;
    });
    this.hierarchies.push(hierarchy);
  }
  public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
    for (let hierarchy of this.hierarchies) {
      const priority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);
      if (priority && requiredPriority && priority >= requiredPriority) {
        return true;
      }
    }
    return false;
  }
  async getTokens(
    userId: number,
    email: string,
    name: string | null,
    adrPost: string | null,
    comment: string | null,
    typeUser: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      name: name,
      adrPost: adrPost,
      comment: comment,
      typeUser: typeUser,
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
