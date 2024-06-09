"use server";

import { absoulteUrl } from "@/config";
import { getUserSubscriptionPlan } from "@/data/stripe";
import { pricingPlan } from "@/data/website";
import { stripe } from "@/lib/stripe";

const addQueryToUrl = (url: string, query: string, data?: string) => {
  if (!data) return url;
  return `${url}?${query}=${data}`;
};

export const createStripeSession = async (
  id: string,
  plan: (typeof pricingPlan)[0]
) => {
  const billingUrl = absoulteUrl("/dashboard/billing");
  const { planStatus: subscriptionPlan, user } = await getUserSubscriptionPlan(
    id
  );

  console.log("stripe");
  if (subscriptionPlan?.isSubscribed && user?.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: billingUrl,
    });
    console.log("stripe end");

    return {
      url: stripeSession.url,
    };
  }

  if (plan.id.startsWith("oneTimePayment")) {
    console.log("stripe");
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user?.email,
      billing_address_collection: "auto",
      line_items: [
        {
          quantity: 1,
          price: plan.priceIds.test,
        },
      ],
      metadata: {
        userId: String(user?._id),
      },
    });
    console.log("stripe end");
    return {
      url: stripeSession.url,
    };
  }
  if (plan.id.startsWith("subscription")) {
    console.log("stripe");
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      customer_email: user?.email,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          quantity: 1,
          price: plan.priceIds.test,
        },
      ],
      metadata: {
        userId: String(user?._id),
      },
    });
    console.log("stripeend");
    return {
      url: stripeSession.url,
    };
  }
};

// export const createBillingPortal
