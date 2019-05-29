import { Module, MulterModule } from '@nestjs/common';
import { BillsController} from './bills.controller';
import { BillsService } from './bills.service';
import { billsProviders } from './bills.provider';
import { DatabaseModule } from '../database/database.module';
import { PassportModule } from '@nestjs/passport';

export const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [DatabaseModule, passportModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BillsController],
  providers: [BillsService,
    ...billsProviders],
})
export class BillsModule {}
