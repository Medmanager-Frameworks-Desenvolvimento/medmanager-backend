import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEnfermeiroDto {
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  nome: string;

  @IsString({ message: 'O CPF deve ser válido' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @IsEmail({}, { message: 'Forneça um endereço de e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @IsString({ message: 'O telefone deve ser um texto válido' })
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  telefone: string;
}