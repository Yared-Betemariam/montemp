import mongoose, { Document, Model } from "mongoose";

export interface User extends Document {
  email: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: Date;
  planId?: string;
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  stripePriceId: String,
  stripeCurrentPeriodEnd: Date,
  planId: {
    type: String,
    required: true,
  },
});

const Users: Model<User> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default Users;
