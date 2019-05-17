import * as mongoose from 'mongoose';

export const BillSchema = new mongoose.Schema({
  imageBillPath: String,
  imageProductPath: String,
  price: String,
  purchaseDate: String,
  purchaseType: String,
  shop: String,
  product: [String],
  brand: [String],
  warranty: Number,
  description: String,
  createdAt: String,
  updatedAt: String,
  createdById: mongoose.Schema.Types.ObjectId,
  updatedById: mongoose.Schema.Types.ObjectId,
});
