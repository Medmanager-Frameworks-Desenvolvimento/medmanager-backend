import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { PacientesModule } from './modules/pacientes/pacientes.module';
import { EnfermeirosModule } from './modules/enfermeiros/enfermeiros.module';
import { MedicamentosModule } from './modules/medicamentos/medicamentos.module';
import { PrescricoesModule } from './modules/prescricoes/prescricoes.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true,  envFilePath: '.env'}),
    DatabaseModule, 
    AdminModule, AuthModule, PacientesModule, EnfermeirosModule, MedicamentosModule, PrescricoesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {}
