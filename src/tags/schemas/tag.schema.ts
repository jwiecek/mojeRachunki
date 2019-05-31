import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  label: String,
  type: String,
  belongToLabel: [String],
  createdById: String,
});
