import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interfaces';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>) {

  }

  // async showAll() {
  //   const users = await this.userRepository.find();
  //   return users.map(user => user.toResponseObject(false));
  // }
  //
  // async login(data: UserDto) {
  //   const {email, password} = data;
  //   const user = await this.userRepository.findOne({where: {email}});
  //   if (!user || (await user.comparePassword(password))) {
  //     throw new HttpException(
  //       'Invalid username/password',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return user.toResponseObject();
  // }
  //
  // async register(data: UserDto) {
  //   const {email} = data;
  //   let user = await this.userRepository.findOne({where: {email}});
  //   if (user) {
  //     throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
  //   }
  //   user = await this.userRepository.create(data);
  //   await this.userRepository.save(user);
  //   return user.toResponseObject();
  // }
}
