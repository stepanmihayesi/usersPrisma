import { PartialType } from '@nestjs/mapped-types';
import { CreateAndAuthUserDto } from './createAndAuthUser.dto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateAndAuthUserDto) {
  email?: string;
  name?: string;
  adrPost?: string;
  comment?: string;
  mdp?: string;
}
