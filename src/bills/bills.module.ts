import { Module, MulterModule } from '@nestjs/common';
import { BillsController} from './bills.controller';
import { BillsService } from './bills.service';
import { billsProviders } from './bills.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BillsController],
  providers: [BillsService,
    ...billsProviders],
})
export class BillsModule {}
