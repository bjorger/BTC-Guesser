import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from 'src/dtos/authDTO';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  createUser(@Body() authDTO: AuthDTO): string {
    return this.authService.createUser();
  }
}
