import { 
  IsInt, 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsDateString, 
  Min, 
  IsIn
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescricaoDto {
  @ApiProperty({ 
    example: 1, 
    description: 'ID único do paciente cadastrado no sistema.' 
  })
  @IsInt({ message: 'O ID do paciente deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O paciente é obrigatório.' })
  id_paciente: number;

  @ApiProperty({ 
    example: 1, 
    description: 'ID único do enfermeiro responsável pela aplicação.' 
  })
  @IsInt({ message: 'O ID do enfermeiro deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O enfermeiro é obrigatório.' })
  id_enfermeiro: number;

  @ApiProperty({ 
    example: 1, 
    description: 'ID do medicamento.' 
  })
  @IsInt({ message: 'O ID do medicamento deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O medicamento é obrigatório.' })
  id_medicamento: number;

  @ApiProperty({ 
    example: '100mg', 
    description: 'Concentração do medicamento.' 
  })
  @IsString({ message: 'A dosagem deve ser um texto válido (ex: 100mg, 50mg/ml).' })
  @IsNotEmpty({ message: 'A dosagem é obrigatória.' })
  dosagem: string;

  @ApiProperty({ 
    example: 2, 
    description: 'Quantidade numérica a ser administrada pelo enfermeiro.' 
  })
  @IsNumber({}, { message: 'A quantidade deve ser um número.' })
  @Min(0.1, { message: 'A quantidade deve ser maior que zero.' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  quantidade: number;

  @ApiProperty({ 
    example: 'comprimido(s)', 
    description: 'Unidade de medida ou formato de administração.',
    enum: ['mg', 'ml', 'gotas', 'comprimido(s)', 'capsula(s)', 'ampola(s)'] 
  })
  @IsString({ message: 'A unidade de medida deve ser um texto.' })
  @IsNotEmpty({ message: 'A unidade de medida é obrigatória.' })
  @IsIn(['mg', 'ml', 'gotas', 'comprimido(s)', 'capsula(s)', 'ampola(s)'], { 
    message: 'A unidade deve ser uma das opções padronizadas.' 
  })
  unidade_medida: string;

  @ApiProperty({ 
    example: 'NOITE', 
    description: 'Turno planejado para a aplicação do medicamento.',
    enum: ['MANHA', 'TARDE', 'NOITE'] 
  })
  @IsString({ message: 'O turno deve ser um texto.' })
  @IsNotEmpty({ message: 'O turno é obrigatório.' })
  @IsIn(['MANHA', 'TARDE', 'NOITE'], { 
    message: 'O turno deve ser MANHA, TARDE ou NOITE.' 
  })
  turno: string;

  @ApiProperty({ 
    example: '2026-04-28T20:00:00.000Z', 
    description: 'Data e hora exata da prescrição.' 
  })
  @IsDateString({}, { message: 'A data e hora devem estar em um formato válido.' })
  @IsNotEmpty({ message: 'A data e hora são obrigatórias.' })
  data_hora: string; 
}