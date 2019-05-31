import { Document } from 'mongoose';

export interface Tag extends Document {
  readonly label: string;
  readonly type: string;
  readonly belongToLabel?: string[];
  readonly createdById?: string;
}
