"use server";

import { auth } from "@/auth";
import { pricingPlan as PLANS } from "@/data/website";
import { stripe } from "@/lib/stripe";
import Users from "@/mongoose/models/user";

export const getUserSubscriptionPlan = async () => {
  const authSession = await auth();

  if (!authSession?.user.id) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    };
  }

  const dbUser = await Users.findById(authSession.user.id);

  if (!dbUser) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    };
  }

  const isSubscribed = Boolean(
    dbUser.stripePriceId &&
      dbUser.stripeCurrentPeriodEnd && // 86400000 = 1 day
      dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
  );

  const plan = isSubscribed
    ? PLANS.find((plan) => plan.price === Number(dbUser.stripePriceId))
    : null;

  let isCanceled = false;
  if (isSubscribed && dbUser.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      dbUser.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    plan: {
      ...plan,
      stripeSubscriptionId: dbUser.stripeSubscriptionId,
      stripeCurrentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
      stripeCustomerId: dbUser.stripeCustomerId,
      isSubscribed,
      isCanceled,
    },
    user: dbUser,
  };
};
