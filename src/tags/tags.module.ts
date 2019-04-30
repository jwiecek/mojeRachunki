import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { DatabaseModule } from '../database/database.module';
import { tagsProviders } from './tags.provider';
import { TagsController } from './tags.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController],
  providers: [TagsService,
    ...tagsProviders],
})
export class TagsModule {}
