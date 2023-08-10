import { Schema, model,Types, Document, Model , models } from 'mongoose';

interface UserSubscription {
    _id: string;
  userId: string;
  count: number;
  createdAt?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: Date;
}

const UserSubscriptionSchema = new Schema<UserSubscription>({
  _id: { type: String, default: () => new Types.ObjectId().toString() },
  userId: { type: String, required: true, unique: true },
  stripeCustomerId: { type: String, unique: true, index: true },
  stripeSubscriptionId: { type: String, unique: true, index: true },
  stripePriceId: { type: String, unique: true, index: true },
  stripeCurrentPeriodEnd: { type: Date, unique: true },
}, { timestamps: true });

type UserSubscriptionDocument = Document & UserSubscription;
type SubscriptionModel = Model<UserSubscriptionDocument>;

const UserSubscriptionModel: SubscriptionModel =
(models?.UserSubscription as SubscriptionModel) || model<UserSubscriptionDocument>('UserSubscription', UserSubscriptionSchema);

export default UserSubscriptionModel;
