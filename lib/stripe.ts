import { pricingPlan } from "@/data/website";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-04-10",
  typescript: true,
});

export const getPlanByAmount = (amount: number) => {
  const plan = pricingPlan.find((item) => item.price * 100 === amount);
  return plan;
};
