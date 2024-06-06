import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/mongoose/db";
import { getPlanByAmount, stripe } from "@/lib/stripe";
import Users from "@/mongoose/models/user";
import { headers } from "next/headers";
import type Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret || ""
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const eventType = event.type;
  await connectDB();
  try {
    switch (eventType) {
      case "checkout.session.completed": {
        if (!session?.metadata?.userId) {
          return new Response(null, {
            status: 200,
          });
        }

        if (session.mode == "payment") {
          // it is on time payment
          const id = session.metadata.userId;
          const price = session.amount_total;

          await Users.findOneAndUpdate(
            {
              _id: id,
            },
            {
              planId: getPlanByAmount(price as number)?.id,
            }
          );

          break;
        }

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const id = session.metadata.userId;
        const price = subscription.items.data[0].price;

        await Users.findOneAndUpdate(
          {
            _id: id,
          },
          {
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
            planId: getPlanByAmount(price.unit_amount as number)?.id,
          }
        );
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          event.data.object.id
        );

        await Users.findOneAndUpdate(
          {
            stripeSubscriptionId: subscription.id,
          },
          {
            $unset: {
              stripePriceId: "",
              stripeCurrentPeriodEnd: "",
            },
            planId: "free",
          }
        );
      }
      // case "invoice.payment_succeeded": {
      //   console.log("invoice");
      //   const subscription = await stripe.subscriptions.retrieve(
      //     session.subscription as string
      //   );
      //   console.log(subscription.id);
      //   await Users.findOneAndUpdate(
      //     {
      //       stripeSubscriptionId: subscription.id,
      //     },
      //     {
      //       stripePriceId: subscription.items.data[0]?.price.id,
      //       stripeCurrentPeriodEnd: new Date(
      //         subscription.current_period_end * 1000
      //       ),
      //     }
      //   );
      // }
      default:
    }
  } catch (error) {
    console.log(error);
  }

  return new Response(null, { status: 200 });
}
