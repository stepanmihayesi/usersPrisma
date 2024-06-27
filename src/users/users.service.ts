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
        hash: hash,
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

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        adrPost: true,
        comment: true,
        mailCheck: true,
        typeUser: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password
        mdp: false,
      },
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
      updateData.hash = hash;
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
