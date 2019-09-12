import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './interfaces/bill.interfaces';
import { ObjectId } from "mongodb";

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
  async findAllByUser(createdById: string): Promise<Bill[]> {
    return await this.billModel.find({createdById}).exec();
  }

  async find(purchaseType: string) {
    return await this.billModel.find({purchaseType});
  }

  async findOneById(id: string) {
    return await this.billModel.findById(id);
  }

  async updateBill(id, createBillDto: CreateBillDto): Promise<Bill> {
    return await this.billModel.findByIdAndUpdate(id, createBillDto, { new: true });
  }

  async destroyById(id: string) {
    await this.billModel.findByIdAndDelete(id);
    return {deleted : true};
  }

  async filter(data: string, currentUser: string) {
    const filterList = [];
    const products = await this.billModel.aggregate([
      {$match: {
        $and: [
        {createdById : currentUser},
        {product: {$regex: data, $options: 'i' },
      }]}},
      // {$unwind: '$product'},
      {$group: {
          _id: '$product',
          idList: {$push: '$_id'},
        }},
      ]).exec();

    const brands = await this.billModel.aggregate([
      {$match: {
        createdById : currentUser,
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
          createdById : currentUser,
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

  async filterAll(filters, currentUser: string){
    console.log(filters);
    const filterParse = JSON.parse(JSON.stringify(filters));
    const idList = filters.searchIdList.map(id => ObjectId(id));
    const filterArray: any = [
      { createdById: currentUser },
    ];
    if(filters.selectedCategory.length){
      filterArray.push({ purchaseType: {$in: filterParse.selectedCategory}});
    }
    if(filters.selectedPriceFrom){
      filterArray.push({ price: { $gt: filterParse.selectedPriceFrom} });
    }
    if(filters.selectedPriceTo){
      filterArray.push({ price: { $lte: filterParse.selectedPriceTo} });
    }
    if(filters.purchaseDateFrom){
      filterArray.push({ purchaseDate: { $gt: filterParse.purchaseDateFrom } },
      );
    }
    if(filters.purchaseDateTo){
      filterArray.push({ purchaseDate: { $lte: filterParse.purchaseDateTo } },
      );
    }
    if(filters.warrantyDateFrom){
      filterArray.push({ warrantyEndDate: {$gt: filterParse.warrantyDateFrom} },
      );
    }
    if(filters.warrantyDateTo){
      filterArray.push({ warrantyEndDate: {$lte: filterParse.warrantyDateTo} },
      );
    }
    if(idList.length){
      filterArray.push( { _id: {$in: idList} });
    }

    const billsFiltered = await this.billModel.find(
      {
        $and:  filterArray
      }
    );
    return await billsFiltered
  }
}
