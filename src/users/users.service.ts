import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@Inject('UserModelToken') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOneByEmail(email): Model<User> {
    return await this.userModel.findOne({email: email});
  }

  // async findAll(): Model<User> {
  //   return await this.userModel.findAll();
  // }

}
