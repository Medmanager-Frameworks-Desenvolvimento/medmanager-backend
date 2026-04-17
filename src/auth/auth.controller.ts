import {
  Body,  
  Post, 
  Inject,
  HttpCode, 
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SignInDto) {
    return this.authService.signin(body);
  }
}