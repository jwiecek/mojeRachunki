import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller()
export class UserController {
  // constructor(private usersService: UserService) {}

  // @Post('save')
  // async saveUser(@Body() body) {
  //   const savedUser = await this.usersService.saveUser(body);
  //   if (!savedUser) {
  //     throw new HttpException('Użytkownik nie został zapisany', HttpStatus.BAD_REQUEST);
  //   }
  //   return savedUser;
  // }

  // @Get('api/users')
  //   showAllUsers() {
  //     return this.usersService.showAll();
  // }
  //
  // @Post('login')
  // @UsePipes(new ValidationPipe())
  // login(@Body() data: UserDto) {
  //   return this.usersService.login(data);
  // }
  //
  // @Post('register')
  // @UsePipes(new ValidationPipe())
  // register(@Body() data: UserDto) {
  //   return this.usersService.register(data);
  // }

}
