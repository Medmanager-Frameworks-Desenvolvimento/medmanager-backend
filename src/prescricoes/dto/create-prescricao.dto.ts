import { 
  IsInt, 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  IsDateString, 
  Min, 
  IsIn
} from 'class-validator';

export class CreatePrescricaoDto {
  @IsInt({ message: 'O ID do paciente deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O paciente é obrigatório.' })
  id_paciente: number;

  @IsInt({ message: 'O ID do enfermeiro deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O enfermeiro é obrigatório.' })
  id_enfermeiro: number;

  @IsInt({ message: 'O ID do medicamento deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O medicamento é obrigatório.' })
  id_medicamento: number;

  @IsNumber({}, { message: 'A dosagem deve ser um número.' })
  @Min(0.1, { message: 'A dosagem deve ser maior que zero.' })
  @IsNotEmpty({ message: 'A dosagem é obrigatória.' })
  dosagem: number;

  @IsString({ message: 'O turno deve ser um texto.' })
  @IsNotEmpty({ message: 'O turno é obrigatório.' })
  @IsIn(['MANHA', 'TARDE', 'NOITE'], { 
    message: 'O turno deve ser MANHA, TARDE ou NOITE.' 
  })
  turno: string;

  @IsDateString({}, { message: 'A data e hora devem estar em um formato válido.' })
  @IsNotEmpty({ message: 'A data e hora são obrigatórias.' })
  data_hora: string; 
}