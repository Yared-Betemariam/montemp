import { defaultPlanId } from "@/data/website";
import { getPlanByAmount } from "@/lib/stripe";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const session = useSession();

  return {
    user: session.data?.user || null,
    isLoading: session.status == "loading",
  };
};

export const useUserPlan = () => {
  const { user } = useCurrentUser();
  return user?.planId;
};

// used when there are no free plans
export const useHasUserPaid = () => {
  const [res, setRes] = useState(true);

  const planId = useUserPlan();

  // const plan = getPlanByAmount(0);
  // if (plan) return setRes(true);

  useEffect(() => {
    if (planId == "free") {
      setRes(false);
    } else {
      setRes(true);
    }
  }, [planId]);

  return res;
};
