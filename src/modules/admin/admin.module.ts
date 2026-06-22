import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({ 
    imports: [DatabaseModule, forwardRef(() => AuthModule)],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
