import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAndAuthUserDto {
  @IsNotEmpty({ message: "L'E-mail est un champ obligatoire." })
  @IsEmail({}, { message: "L'E-mail doit être un e-mail valide." })
  email: string;
  @IsNotEmpty({ message: "Mot de passe est un champ obligatoire." })
  @IsString({ message: "Le mot de passe doit être une chaîne de caractères alphanumériques." } )
  @MinLength(10, {message: "Le mot de passe doit contenir au moins dix caractères."})
  mdp: string;
  name?: string;
  adrPost?: string;
  comment?: string;
  typeUser: string;
}
