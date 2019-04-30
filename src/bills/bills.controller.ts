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
  FilesInterceptor,
} from '@nestjs/common';
import { BillsService} from './bills.service';
import { Bill } from './interfaces/bill.interfaces';
import { CreateBillDto} from './dto/create-bill.dto';
import { ApiUseTags, ApiImplicitFile } from '@nestjs/swagger';
import { diskStorage } from 'multer';

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
      message: 'Customer has been successfully updated',
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
  @UseInterceptors(FilesInterceptor('image'))
  @ApiImplicitFile({ name: 'image', required: true })
  uploadFile(@UploadedFiles() file, @Body() body) {
    console.log(file);
    return file;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, {root:
        'uploads'});
  }
}
