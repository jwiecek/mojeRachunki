import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get('token')
  // async createToken(): Promise<any> {
  //   return await this.authService.createToken();
  // }
  //
  // @Get('data')
  // @UseGuards(AuthGuard())
  // findAll() {
  //   // this route is restricted by AuthGuard
  //   // JWT strategy
  // }
}
