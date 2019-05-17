import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';


@ApiUseTags('users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  // This route will require successfully passing our default auth strategy (JWT) in order
  // to access the route
  // @Get('test')
  // @UseGuards(AuthGuard())
  //
  // testAuthRoute() {
  //   return {
  //     message: 'You did it!'
  //   }
  // }

  @Get('users')
  @UseGuards(AuthGuard())
  findAll() {
    return [];
  }

}
