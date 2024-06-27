import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAndAuthUserDto } from '@app/shared/dto/createAndAuthUser.dto';
import { UpdateUserDto } from '@app/shared/dto/updateUser.dto';
import { Public } from '@app/shared/decorators';
import { Roles } from '@app/shared/decorators/roles.decorator';
import { AuthGuard } from '@app/shared/guards/auth.guard';
import { RoleGuard } from '@app/shared/guards/role.guard';
import { Role } from '@app/auth/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateAndAuthUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  async findOne(@Param('id') id: string, @Req() req) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('Ressource introuvable !');
    }
    if (req.user.typeUser === Role.USER && req.user.sub !== user.id) {
      throw new ForbiddenException(
        'Vos droits sont insuffisants pour accéder à cette ressource !',
      );
    }
    return user;
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('Ressource introuvable !');
    }
    if (req.user.typeUser === Role.USER && req.user.sub !== user.id) {
      throw new ForbiddenException(
        'Vos droits sont insuffisants pour modifier cette ressource !',
      );
    }
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(AuthGuard, RoleGuard)
  async remove(@Param('id') id: string, @Req() req) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('Ressource introuvable !');
    }
    if (req.user.typeUser === Role.USER && req.user.sub !== user.id) {
      throw new ForbiddenException(
        'Vos droits sont insuffisants pour supprimer cette ressource !',
      );
    }
    return this.usersService.deleteUser(+id);
  }
}
