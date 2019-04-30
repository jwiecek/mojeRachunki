import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './interfaces/tag.interfaces';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsServices: TagsService) {}

  @Post('create')
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsServices.create(createTagDto);
  }

  @Get('all')
  async findAll(): Promise<Tag[]> {
    return this.tagsServices.findAll();
  }

  @Delete('delete/:id')
  async removeById(@Param('id') id: string) {
    return this.tagsServices.destroyById(id);
  }
}
