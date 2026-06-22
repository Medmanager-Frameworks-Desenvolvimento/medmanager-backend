import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ 
    example: 'admin@clinica.com.br', 
    description: 'Endereço de e-mail cadastrado no sistema para realizar o login.' 
  })
  @IsEmail({}, { message: 'Forneça um endereço de e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório para o login.' })
  email: string;

  @ApiProperty({ 
    example: 'SenhaForte123', 
    description: 'Senha de acesso do usuário.' 
  })
  @IsString({ message: 'A senha deve ser um texto válido.' })
  @IsNotEmpty({ message: 'A senha é obrigatória para o login.' })
  senha: string;
}