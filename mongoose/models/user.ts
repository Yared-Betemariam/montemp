import mongoose, { Document, Model } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  image: string | undefined;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: Date;
}

const userSchema = new mongoose.Schema<User>({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
  stripeCustomerId: {
    type: String,
    unique: true,
  },
  stripeSubscriptionId: {
    type: String,
    unique: true,
  },
  stripePriceId: String,
  stripeCurrentPeriodEnd: Date,
});

const Users: Model<User> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default Users;
