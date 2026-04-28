import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { EnfermeirosModule } from './enfermeiros/enfermeiros.module';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { PrescricoesModule } from './prescricoes/prescricoes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,  envFilePath: '.env'}),
    DatabaseModule, 
    AdminModule, AuthModule, PacientesModule, EnfermeirosModule, MedicamentosModule, PrescricoesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {}
