import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PacientesController],
  providers: [PacientesService],
  imports: [DatabaseModule]
})
export class PacientesModule {}
