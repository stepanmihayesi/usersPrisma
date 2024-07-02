import { PartialType } from '@nestjs/mapped-types';
import { CreateAndAuthUserDto } from './createAndAuthUser.dto';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateAndAuthUserDto) {
  @IsEmail({}, { message: "L'E-mail doit être un e-mail valide." })
  email?: string;
  @IsString({
    message:
      'Le mot de passe doit être une chaîne de caractères alphanumériques.',
  })
  @MinLength(10, {
    message: 'Le mot de passe doit contenir au moins dix caractères.',
  })
  mdp?: string;
  name?: string;
  adrPost?: string;
  comment?: string;
}
