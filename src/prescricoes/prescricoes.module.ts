import { Module } from '@nestjs/common';
import { PrescricoesService } from './prescricoes.service';
import { PrescricoesController } from './prescricoes.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PrescricoesController],
  providers: [PrescricoesService],
  imports: [DatabaseModule]
})
export class PrescricoesModule {}
