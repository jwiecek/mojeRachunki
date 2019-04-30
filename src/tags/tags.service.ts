import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Tag } from './interfaces/tag.interfaces';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TagModelToken')
    private readonly tagModel: Model<Tag>) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel(createTagDto);
    return await createdTag.save();
      // .then(tag => {
      //   return tag;
      // })
      // .catch(() => {
      //   throw new BadRequestException('There was a problem when adding the object');
      // });
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find().exec();
  }

  async destroyById(id: string) {
    await this.tagModel.findByIdAndDelete(id);
    return {deleted : true};
  }
}
