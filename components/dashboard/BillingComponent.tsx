"use client";

import { useUserSubscriptionPlan } from "@/store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { format } from "date-fns";

const BillingComponent = () => {
  const {
    isLoading,
    subscriptionPlan: rawPlan,
    updateSubscriptionPlan,
  } = useUserSubscriptionPlan((state) => state);

  const subscriptionPlan = rawPlan?.plan;

  useEffect(() => {
    updateSubscriptionPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(subscriptionPlan);

  return (
    <section className="wrapper py-4 flex flex-col">
      <h2 className="text-xl font-semibold">Billing</h2>
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 gap-2 opacity-60">
          <Loader2 className="animate-spin" size={32} />
          <span className="text-sm">Getting user information</span>
        </div>
      )}
      {!isLoading && subscriptionPlan && (
        <>
          <div className="bg-white rounded-xl drop-shadow-md p-4 flex flex-col text-base">
            <span>You are currently on the {subscriptionPlan?.name}</span>
            {JSON.stringify(subscriptionPlan)}
            {subscriptionPlan?.isSubscribed && (
              <div>
                <span>
                  {subscriptionPlan.isCanceled
                    ? "Your plan will be canceled on "
                    : "Your plan renews on"}
                </span>
                {format(subscriptionPlan.stripeCurrentPeriodEnd!, "dd.MM.yyyy")}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};
export default BillingComponent;
