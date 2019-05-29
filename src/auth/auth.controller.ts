import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';
import { LoginUserDto } from '../users/dto/login-user.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.validateUserByPassword(loginUserDto);
  }
}

