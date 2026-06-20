import { PartialType } from '@nestjs/swagger';
import { CreateEnfermeiroDto } from './create-enfermeiro.dto';

export class UpdateEnfermeiroDto extends PartialType(CreateEnfermeiroDto) {}
