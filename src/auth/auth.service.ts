import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from '../users/dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserByPassword(loginAttempt: LoginUserDto) {

    // throw new HttpException({
    //   error: 'en mes',
    //   message: 'pl mes'
    // }, 401);

    const userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
    return new Promise((resolve) => {
      userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
        if (err) { throw new UnauthorizedException(); }
        if (isMatch) {
          resolve(this.createJwtPayload(userToAttempt));
        } else {
          throw new HttpException({
            error: 'en mes',
            message: 'pl mes'
          }, 401);
        }
      });
    });
  }

  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new HttpException({
       error: 'en mes',
       message: 'pl mes'
      }, 401);
    }
  }

  createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email,
    };
    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      token: jwt,
      userId: user._id,
    };
  }

}
