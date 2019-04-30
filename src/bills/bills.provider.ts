import { Connection } from 'mongoose';
import { BillSchema } from './schemas/bill.schema';

export const billsProviders = [
  {
    provide: 'BillModelToken',
    useFactory: (connection: Connection) => connection.model('Bill', BillSchema),
    inject: ['DbConnectionToken'],
  },
];
