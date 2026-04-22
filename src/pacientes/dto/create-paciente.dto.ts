import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePacienteDto {
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  nome: string;

  @IsString({ message: 'O CPF deve ser válido' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @IsInt({ message: 'A idade deve ser um número inteiro' })
  @IsNotEmpty({ message: 'A idade é obrigatória' })
  @Min(0, { message: 'A idade não pode ser negativa' })
  idade: number;

  @IsArray({ message: 'As doenças crônicas devem ser uma lista' })
  @IsString({ each: true, message: 'Cada doença na lista deve ser um texto' })
  @IsOptional()
  doenca_cronica?: string[];
}