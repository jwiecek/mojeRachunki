import { Module, MulterModule } from '@nestjs/common';
import { BillsModule } from './bills/bills.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [ BillsModule, TagsModule, UsersModule, AuthModule,
    // MulterModule.register(({
    // dest: 'uploads',}))
  ],
})
export class AppModule {}
