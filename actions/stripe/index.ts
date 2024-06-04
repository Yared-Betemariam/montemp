"use server";

import { absoulteUrl } from "@/config";
import { getUserSubscriptionPlan } from "@/data/stripe";
import { pricingPlan } from "@/data/website";
import { stripe } from "@/lib/stripe";

export const createStripeSession = async () => {
  const billingUrl = absoulteUrl("/dashboard/billing");
  const { plan: subscriptionPlan, user } = await getUserSubscriptionPlan();

  if (subscriptionPlan?.isSubscribed && user.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: billingUrl,
    });

    return { url: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card", "paypal"],
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [
      {
        quantity: 1,
        price: pricingPlan.find((item) => item.id == "pro")?.priceIds.test,
      },
    ],
    metadata: {
      userId: String(user?._id),
    },
  });
  return { url: stripeSession.url };
};
