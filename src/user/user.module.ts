import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { User } from './interfaces/user.interfaces';
import { UserDto } from './dto/user.dto';

@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity])],
  // providers: [UserService],
  // controllers: [UserController],
})
export class UserModule {}
