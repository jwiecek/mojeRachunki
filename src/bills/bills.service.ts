import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './interfaces/bill.interfaces';

@Injectable()
export class BillsService {
  constructor(
    @Inject('BillModelToken')
    private readonly billModel: Model<Bill>) {}

  async create(createBillDto: CreateBillDto): Promise<Bill> {
    const createdBill = new this.billModel(createBillDto);
    return await createdBill.save();
  }

  async findAll(): Promise<Bill[]> {
    return await this.billModel.find().exec();
  }

  async find(purchaseType: string) {
    return await this.billModel.find({purchaseType});
  }

  async findOneById(id: string) {
    return await this.billModel.findById(id);
  }

  async updateBill(id, createBillDto: CreateBillDto): Promise<Bill> {
    const updatedBill = await this.billModel.findByIdAndUpdate(id, createBillDto, { new: true });
    return updatedBill;
  }

  async destroyById(id: string) {
    await this.billModel.findByIdAndDelete(id);
    return {deleted : true};
  }

  async filter(data: string) {
    const filterList = [];
    const products = await this.billModel.aggregate([
      {$match: {
        product: {$regex: data, $options: 'i' },
      }},
      // {$unwind: '$product'},
      {$group: {
          _id: '$product',
          idList: {$push: '$_id'},
        }},
      ]).exec();

    const brands = await this.billModel.aggregate([
      {$match: {
        brand: {$regex: data, $options: 'i' },
      }},
      // {$unwind: '$brand'},
      {$group: {
          _id: '$brand',
          idList: {$push: '$_id'},
        }},
      ]).exec();

    const shops = await this.billModel.aggregate([
      {$match: {
          shop: {$regex: data, $options: 'i' },
      }},
      // {$unwind: '$shop'},
      {$group: {
          _id: '$shop',
          idList: {$push: '$_id'},
        }},
      ]).exec();

    filterList.push(...products, ...brands, ...shops);

    return await filterList;
  }
}
