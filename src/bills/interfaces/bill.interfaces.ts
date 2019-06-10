import { Document } from 'mongoose';

export interface Bill extends Document {
  readonly imageBillPath?: string;
  readonly imageProductPath?: string;
  readonly price: number;
  readonly purchaseDate: string;
  readonly purchaseType: string;
  readonly shop: string;
  readonly product: string[];
  readonly brand: string[];
  readonly warranty: number;
  readonly warrantyEndDate: string;
  readonly description?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
