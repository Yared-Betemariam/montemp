"use client";

import { useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import { useUserSubscriptionPlan } from "@/store";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    useUserSubscriptionPlan.getState().updateSubscriptionPlan();
  });
  return (
    <main className="flex-1 flex relative">
      <section className="flex flex-1 flex-col bg-gradient-to-bl bg-neutral-50">
        <DashboardHeader />
        {children}
      </section>
    </main>
  );
};
export default DashboardWrapper;
