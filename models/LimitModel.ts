// models/LimitModel.ts

import { Schema, model, Types, models, Document, Model } from 'mongoose';

interface Limit {
  _id: string;
  userId: string;
  count: number;
  createdAt?: string;
}

const LimitSchema = new Schema<Limit>({
  _id: { type: String, default: () => new Types.ObjectId().toString() },
  userId: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
}, { timestamps: true });

type LimitDocument = Document & Limit;
type LimitModel = Model<LimitDocument>;

const ApiLimitModel: LimitModel =
  (models?.ApiLimit as LimitModel) ||
  model<LimitDocument>('ApiLimit', LimitSchema);

export default ApiLimitModel;
