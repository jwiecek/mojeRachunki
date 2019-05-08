import { Module, MulterModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
import { DatabaseModule } from '../database/database.module';
import { BillsController } from '../bills/bills.controller';
import { BillsService } from '../bills/bills.service';
import { billsProviders } from '../bills/bills.provider';
import { usersProviders } from './user.provider';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  exports: [
    UsersService,
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    UsersService,
    ...usersProviders,
  ],
})
export class UsersModule {}
