import { defaultPlanId } from "@/data/website";
import { useUserSubscriptionPlan } from "@/store";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  return {
    user: session.data?.user || null,
    isLoading: session.status == "loading",
  };
};

export const useUserPlan = () => {
  const { user } = useCurrentUser();
  return user?.planId || defaultPlanId;
};
