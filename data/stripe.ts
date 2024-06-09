"use server";

import { auth } from "@/auth";
import { pricingPlan as PLANS, pricingPlan } from "@/data/website";
import { stripe } from "@/lib/stripe";
import connectDB from "@/mongoose/db";
import Users, { User } from "@/mongoose/models/user";

export const getUserSubscriptionPlan = async (id: string) => {
  await connectDB();
  const dbUser = await Users.findById(id).lean<User>().exec();

  if (!dbUser) {
    return {
      planStatus: {
        isSubscribed: false,
        isCanceled: false,
        stripeCurrentPeriodEnd: null,
      },
    };
  }

  const PLAN = pricingPlan.find((item) => item.id === String(dbUser.planId));

  const isSubscribed = Boolean(
    dbUser.stripePriceId &&
      dbUser.stripeCurrentPeriodEnd && // 86400000 = 1 day
      dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
  );

  let isCanceled = false;
  if (isSubscribed && dbUser.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      dbUser.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    plan: PLAN,
    planStatus: {
      stripeSubscriptionId: dbUser.stripeSubscriptionId,
      stripeCurrentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
      stripeCustomerId: dbUser.stripeCustomerId,
      isSubscribed,
      isCanceled,
    },
    user: {
      _id: String(id),
      email: String(dbUser.email),
      stripeSubscriptionId: dbUser.stripeSubscriptionId,
      stripeCurrentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
      stripeCustomerId: dbUser.stripeCustomerId,
    } as User,
  };
};
