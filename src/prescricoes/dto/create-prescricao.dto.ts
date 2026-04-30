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
    example: 1.5, 
    description: 'Dosagem do medicamento (ex: mg, ml, comprimidos).' 
  })
  @IsNumber({}, { message: 'A dosagem deve ser um número.' })
  @Min(0.1, { message: 'A dosagem deve ser maior que zero.' })
  @IsNotEmpty({ message: 'A dosagem é obrigatória.' })
  dosagem: number;

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