// Your stores go here
import { getUserSubscriptionPlan } from "@/data/stripe";
import { create } from "zustand";

interface subscriptionPlanStore {
  subscriptionPlan:
    | Awaited<ReturnType<typeof getUserSubscriptionPlan>>
    | undefined;
  updateSubscriptionPlan: (userId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useUserSubscriptionPlan = create<subscriptionPlanStore>((set) => ({
  subscriptionPlan: undefined,
  isLoading: true,
  error: null,
  updateSubscriptionPlan: async (userId: string) => {
    try {
      set({ isLoading: true });
      const subscriptionPlan = await getUserSubscriptionPlan(userId);
      set({ subscriptionPlan });
    } catch (error) {
      console.log(error);
      set({ error: "Something went wrong. Try again!" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
