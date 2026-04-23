import {
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateMedicamentoDto {
  @IsString({ message: 'O nome deve ser um texto válido' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
  nome: string;

  @IsString({ message: 'A descrição deve ser um texto válido' })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @MinLength(5, { message: 'Forneça uma descrição mais detalhada' })
  descricao: string;

  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @Min(0, { message: 'A quantidade não pode ser negativa' })
  quantidade: number;

  @IsDateString({}, { message: 'A validade deve ser uma data válida (ex: YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'A validade é obrigatória' })
  validade: string; 
}