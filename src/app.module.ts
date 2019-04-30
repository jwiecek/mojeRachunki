import { Module, MulterModule } from '@nestjs/common';
import { BillsModule } from './bills/bills.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ BillsModule, TagsModule, AuthModule, UserModule,
    // MulterModule.register(({
    // dest: 'uploads',}))
  ],
})
export class AppModule {}
