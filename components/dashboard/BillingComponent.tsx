"use client";

import { useUserSubscriptionPlan } from "@/store";
import { format } from "date-fns";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import UpgradeModal from "./UpgradeModal";
import UpgradePlan from "../website/UpgradePlan";
import StartPaying from "../website/StartPaying";

const BillingComponent = () => {
  const {
    isLoading,
    subscriptionPlan: rawPlan,
    updateSubscriptionPlan,
  } = useUserSubscriptionPlan((state) => state);
  const subscriptionPlan = rawPlan?.plan;
  const planStatus = rawPlan?.planStatus;

  useEffect(() => {
    updateSubscriptionPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="wrapper py-4 flex flex-col gap-6">
      {!isLoading && subscriptionPlan && (
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">Billing</h2>
          <p className="text-base opacity-80">
            Manage your subscription plans and payments
          </p>
        </div>
      )}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 opacity-60">
          <Loader2 className="animate-spin" size={32} />
          <span className="text-sm">Getting your billing information</span>
        </div>
      )}
      {!isLoading && subscriptionPlan && (
        <>
          <div className="bg-white rounded-2xl mr-auto drop-shadow-md p-8 pb-[1.425rem] px-10 simpleborder flex flex-col text-base min-w-[48rem] gap-3">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">Subscription plan</h3>
              <p className="text-base">
                You are currently on the{" "}
                <span className="font-semibold text-lg">
                  {subscriptionPlan?.name}
                </span>{" "}
                Plan
              </p>
            </div>

            {subscriptionPlan.id == "free" && (
              <div>
                <UpgradeModal />
              </div>
            )}

            {subscriptionPlan.id.startsWith("subscription") && (
              <div className="flex items-center justify-between">
                <UpgradePlan
                  plan={subscriptionPlan}
                  text="Manage Subscriptions"
                  simple
                />
                {planStatus?.isSubscribed && (
                  <p className="flex items-center gap-2 text-base opacity-80 font-normal justify-end py-3">
                    <span>
                      {planStatus.isCanceled
                        ? "Your plan will be canceled on "
                        : "Your plan renews on"}
                    </span>
                    {format(planStatus.stripeCurrentPeriodEnd!, "dd/MM/yyyy")}
                  </p>
                )}
              </div>
            )}

            {subscriptionPlan.id.startsWith("oneTimePayment") && (
              <p className="text-base opacity-70">
                No need to pay any more, Enjoy using our app
              </p>
            )}
          </div>
        </>
      )}
      {!isLoading && !subscriptionPlan && <StartPaying />}
    </section>
  );
};
export default BillingComponent;
