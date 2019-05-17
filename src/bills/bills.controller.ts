import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
  FilesInterceptor, FileInterceptor, UploadedFile,
} from '@nestjs/common';
import { BillsService} from './bills.service';
import { Bill } from './interfaces/bill.interfaces';
import { CreateBillDto} from './dto/create-bill.dto';
import { ApiUseTags, ApiImplicitFile } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { multerOptions } from '../config/multer.config';

import { extname } from 'path';
import * as path from 'path';

const pngFileFilter = (req, file, callback) => {

  let ext = path.extname(file.originalname);

  if(ext !== '.jpg'){
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Invalid file type'), false);
  }

  return callback(null, true);

}


@ApiUseTags('bills')
@Controller('bills')

export class BillsController {
  constructor(private readonly billsServices: BillsService) {}

  @Post('create')
  async create(@Body() createBillDto: CreateBillDto) {
    return this.billsServices.create(createBillDto);
  }

  @Get('all')
  async findAll(): Promise<Bill[]> {
    return this.billsServices.findAll();
  }

  @Get('findByPurchaseType/:purchaseType')
  async findOne(@Param('purchaseType') data: string): Promise<Bill> {
    return this.billsServices.find(data);
  }

  @Get('find/:id')
  async findOneById(@Param('id') id: string): Promise<Bill> {
    return this.billsServices.findOneById(id);
  }

  @Put('/update')
  async updateCustomer(@Res() res, @Query('id') id: string, @Body() createBillDto: CreateBillDto) {
    const bill = await this.billsServices.updateBill(id, createBillDto);
    if (!bill) { throw new NotFoundException('Cat does not exist!'); }
    return res.status(HttpStatus.OK).json({
      message: 'Bill has been successfully updated',
      bill,
    });
  }

  @Delete('delete/:id')
  async removeById(@Param('id') id: string) {
    return this.billsServices.destroyById(id);
  }

  @Get('filter/:data')
  async filter(@Param('data') data: string): Promise<any[]> {
    return this.billsServices.filter(data);
  }

  @Post('/uploadPhoto')
  @UseInterceptors(FilesInterceptor('images', 20, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() =>
          (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  logFiles(@UploadedFiles() images, @Body() fileDto) {

    console.log(images);
    console.log(fileDto);

    return 'Done';

  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, {root:
        'uploads'});
  }
}
