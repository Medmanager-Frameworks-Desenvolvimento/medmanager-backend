import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePacienteDto {
  @ApiProperty({ 
    example: 'João da Silva', 
    description: 'Nome completo do paciente.' 
  })
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  nome: string;

  @ApiProperty({ 
    example: '12345678900', 
    description: 'CPF do paciente.' 
  })
  @IsString({ message: 'O CPF deve ser válido' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  cpf: string;

  @ApiProperty({ 
    example: 45, 
    description: 'Idade do paciente em anos.' 
  })
  @IsInt({ message: 'A idade deve ser um número inteiro' })
  @IsNotEmpty({ message: 'A idade é obrigatória' })
  @Min(0, { message: 'A idade não pode ser negativa' })
  idade: number;

  @ApiPropertyOptional({ 
    example: ['Hipertensão', 'Diabetes'], 
    description: 'Lista de doenças crônicas. Pode ser enviada vazia ou omitida.',
    type: [String]
  })
  @IsArray({ message: 'As doenças crônicas devem ser uma lista' })
  @IsString({ each: true, message: 'Cada doença na lista deve ser um texto' })
  @IsOptional()
  doenca_cronica?: string[];
}