import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService,
              private readonly usersService: UserService) {}

  // async createToken() {
  //   const user: JwtPayload = { email: 'test@email.com' };
  //   const accessToken = this.jwtService.sign(user);
  //   return {
  //     expiresIn: 3600,
  //     accessToken,
  //   };
  // }
  //
  // async signIn(): Promise<string> {
  //   // In the real-world app you shouldn't expose this method publicly
  //   // instead, return a token once you verify user credentials
  //   const user: JwtPayload = { email: 'user@email.com' };
  //   return this.jwtService.sign(user);
  // }

  // async validateUser(payload: JwtPayload): Promise<any> {
  //   return await this.usersService.findOneByEmail(payload.email);
  // }
}
