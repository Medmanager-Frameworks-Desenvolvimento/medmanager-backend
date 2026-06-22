import { Module } from '@nestjs/common';
import { PrescricoesService } from './prescricoes.service';
import { PrescricoesController } from './prescricoes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  controllers: [PrescricoesController],
  providers: [PrescricoesService, NotificationsGateway],
  imports: [DatabaseModule]
})
export class PrescricoesModule {}
