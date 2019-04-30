import { Connection } from 'mongoose';
import { TagSchema } from './schemas/tag.schema';

export const tagsProviders = [
  {
    provide: 'TagModelToken',
    useFactory: (connection: Connection) => connection.model('Tag', TagSchema),
    inject: ['DbConnectionToken'],
  },
];
