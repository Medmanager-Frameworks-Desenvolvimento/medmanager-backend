import {
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  Min,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicamentoDto {
  @ApiProperty({ 
    example: 'Dipirona', 
    description: 'Nome comercial do medicamento.' 
  })
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
  nome: string;

  @ApiProperty({ 
    example: 'Analgésico e antitérmico indicado para dores e febres.', 
    description: 'Descrição detalhada ou indicações de uso.' 
  })
  @IsString({ message: 'A descrição deve ser um texto válido' })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @MinLength(5, { message: 'Forneça uma descrição mais detalhada' })
  descricao: string;

  @ApiProperty({ 
    example: 150, 
    description: 'Quantidade física inicial disponível em estoque.' 
  })
  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @Min(0, { message: 'A quantidade não pode ser negativa' })
  quantidade: number;

  @ApiProperty({ 
    example: '2026-04-30', 
    description: 'Data de validade no formato ISO (YYYY-MM-DD).' 
  })
  @IsDateString({}, { message: 'A validade deve ser uma data válida (ex: YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'A validade é obrigatória' })
  validade: string; 
}