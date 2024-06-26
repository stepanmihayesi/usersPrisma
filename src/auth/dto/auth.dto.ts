import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(10, {message: 'Le mot de passe doit contenir au moins dix caractères.'})
  mdp: string;
  name?: string;
  adrPost?: string;
  comment?: string;
  typeUser: string;
}