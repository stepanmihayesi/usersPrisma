import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAndAuthUserDto } from '@app/shared/dto/createAndAuthUser.dto';
import { UpdateUserDto } from '@app/shared/dto/updateUser.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import * as argon2 from 'argon2';
import { Tokens } from '@app/auth/types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessContorlService } from '@app/shared/access-control.service';
import { UpdateUserData } from '@app/shared/interfaces/updateUserData.interface';
import { FilterUserDto } from '@app/shared/dto/filterUser.dto'

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private accessControlService: AccessContorlService,
  ) {}

  async create(dto: CreateAndAuthUserDto): Promise<Tokens> {
    // return 'cette méthode permet de créer un nouvel utilisateur';
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (userExists) {
      throw new ConflictException(
        'Un utilisateur avec cette adresse mail existe déjà !',
      );
    }
    const hash = await argon2.hash(dto.mdp);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        mdp: hash,
        name: dto.name,
        adrPost: dto.adrPost,
        comment: dto.comment,
        hashedRt: hash,
      },
    });
    const tokens = await this.accessControlService.getTokens(
      newUser.id,
      newUser.email,
      newUser.name,
      newUser.adrPost,
      newUser.comment,
      newUser.typeUser,
    );
    await this.accessControlService.updateRtHash(
      newUser.id,
      tokens.refresh_token,
    );
    return tokens;
  }

  async findAll(filterDto: FilterUserDto) {
    const { id, email, name, adrPost, comment, createdAt, updatedAt, sortBy, sortOrder, typeUser } = filterDto;
    const where: any = {};
    if (id) {
      where.id = id;
    }
    if (createdAt) {
      where.createdAt = {
        contains: createdAt,
        mode: 'insensitive',
      };
    }
    if (updatedAt) {
      where.updatedAt = {
        contains: updatedAt,
        mode: 'insensitive',
      };
    }
    if (email) {
      where.email = {
        contains: email,
        mode: 'insensitive',
      };
    }
    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }
    if (adrPost) {
      where.adrPost = {
        contains: adrPost,
        mode: 'insensitive',
      };
    }
    if (comment) {
      where.comment = {
        contains: comment,
        mode: 'insensitive',
      };
    }
    if (typeUser) {
      where.typeUser = typeUser
    }
    const orderBy = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder || 'asc';
    }
    return this.prisma.user.findMany({
      where,
      orderBy,
    });
  }

  async findOne(id: number) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return userExists;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    if (!dto) {
      throw new Error('UpdateUserDto ne peut pas être null ou undefined !');
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`La ressource avec ID : ${id} non trouvé !`);
    }
    const updateData: UpdateUserData = {};
    if (dto.email !== undefined) updateData.email = dto.email;
    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.adrPost !== undefined) updateData.adrPost = dto.adrPost;
    if (dto.comment !== undefined) updateData.comment = dto.comment;
    if (dto.mdp !== undefined) {
      const hash = await argon2.hash(dto.mdp);
      updateData.mdp = hash;
    }
    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    await this.prisma.user.delete({
      where: { id },
    });
  }

}
