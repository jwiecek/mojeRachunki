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
  UseGuards,
} from '@nestjs/common';
import { BillsService} from './bills.service';
import { Bill } from './interfaces/bill.interfaces';
import { CreateBillDto} from './dto/create-bill.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { multerOptions } from '../config/multer.config';
import { User } from '../users/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('bills')
@Controller('bills')

export class BillsController {
  constructor(private readonly billsServices: BillsService) {
  }

  @UseGuards(AuthGuard())
  @Post('create')
  async create(@Body() createBillDto: CreateBillDto) {
    return this.billsServices.create(createBillDto);
  }

  @UseGuards(AuthGuard())
  @Get('allBills')
  async findAll(@User() user): Promise<Bill[]> {
    console.log('user');
    console.log(user);
    return this.billsServices.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('allUserBills')
  async findBillsForUser(@User() user): Promise<Bill[]> {
    console.log(user);
    return this.billsServices.findAllByUser(user.userId);
  }

  @UseGuards(AuthGuard())
  @Get('findByPurchaseType/:purchaseType')
  async findOne(@Param('purchaseType') data: string): Promise<Bill> {
    return this.billsServices.find(data);
  }

  @UseGuards(AuthGuard())
  @Get('find/:id')
  async findOneById(@Param('id') id: string): Promise<Bill> {
    return this.billsServices.findOneById(id);
  }

  @UseGuards(AuthGuard())
  @Put('/update')
  async updateCustomer(@Res() res, @Query('id') id: string, @Body() createBillDto: CreateBillDto) {
    const bill = await this.billsServices.updateBill(id, createBillDto);
    if (!bill) {
      throw new NotFoundException('Cat does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Bill has been successfully updated',
      bill,
    });
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  async removeById(@Param('id') id: string) {
    return this.billsServices.destroyById(id);
  }

  @UseGuards(AuthGuard())
  @Get('filter/:data')
  async filter(@Param('data') data: string): Promise<any[]> {
    return this.billsServices.filter(data);
  }

  @UseGuards(AuthGuard())
  @Post('/uploadPhoto')
  @UseInterceptors(FilesInterceptor('images', 20, multerOptions))
  logFiles(@UploadedFiles() images, @Body() fileDto) {
    console.log(images);
    console.log(fileDto);
    return images;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, {root:
        'uploads'});
  }
}
