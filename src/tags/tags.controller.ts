import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './interfaces/tag.interfaces';
import { ApiUseTags } from '@nestjs/swagger';
import { User } from '../users/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsServices: TagsService) {}

  @UseGuards(AuthGuard())
  @Post('create')
  async create(@Body() createTagDto: CreateTagDto) {
    return this.tagsServices.create(createTagDto);
  }

  @UseGuards(AuthGuard())
  @Get('userTags')
  async findAll(@User() user): Promise<Tag[]> {
    return this.tagsServices.findAll(user.userId);
  }

  @UseGuards(AuthGuard())
  @Get('basic')
  async findBasic(): Promise<Tag[]> {
    return this.tagsServices.findBasic('basic');
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  async removeById(@Param('id') id: string) {
    return this.tagsServices.destroyById(id);
  }
}
