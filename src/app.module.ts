import { Module } from '@nestjs/common';
import { BillsModule } from './bills/bills.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ BillsModule, TagsModule, UsersModule, AuthModule,
  ],
})
export class AppModule {}
