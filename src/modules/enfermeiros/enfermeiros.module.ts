import { Module } from '@nestjs/common';
import { EnfermeirosService } from './enfermeiros.service';
import { EnfermeirosController } from './enfermeiros.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [EnfermeirosController],
  providers: [EnfermeirosService],
  imports: [DatabaseModule]
})
export class EnfermeirosModule {}
