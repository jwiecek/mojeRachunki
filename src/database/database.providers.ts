import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://Mandi:Neokolk!23@ds217976.mlab.com:17976/my-bills'),
  },
];
