import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { DatabaseModule } from '../database/database.module';
import { tagsProviders } from './tags.provider';
import { TagsController } from './tags.controller';
import { PassportModule } from '@nestjs/passport';

export const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });


@Module({
  imports: [DatabaseModule, passportModule],
  controllers: [TagsController],
  providers: [TagsService,
    ...tagsProviders],
})
export class TagsModule {}
