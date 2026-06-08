import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreatePrescricaoDto } from './create-prescricao.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePrescricaoDto extends PartialType(CreatePrescricaoDto) {
  @ApiProperty({ 
    example: true, 
    description: 'Status que indica se o paciente já tomou a medicação prescrita naquele dia.',
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: 'O status da medicação deve ser um valor booleano (verdadeiro ou falso).' })
  tomou_medicacao?: boolean;
}