import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Tag } from './interfaces/tag.interfaces';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TagModelToken')
    private readonly tagModel: Model<Tag>) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    if(!createTagDto){
      throw new HttpException({
        error: 'en mes',
        message: 'brak obiektu'
      }, 401);
    }
    const createdTag = new this.tagModel(createTagDto);
    return await createdTag.save()
      .catch(() => {
        throw new HttpException({
            error: 'en mes',
            message: 'pl mes'
          }, 401);
      });
  }

  async findAll(createdById: string): Promise<Tag[]> {
    return await this.tagModel.find({createdById}).exec();
  }

  async findBasic(createdById: string): Promise<Tag[]> {
    return await this.tagModel.find({createdById}).exec();
  }

  async destroyById(id: string) {
    await this.tagModel.findByIdAndDelete(id);
    return {deleted : true};
  }
}
