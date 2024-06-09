"use client";

import { useCurrentUser, useHasUserPaid } from "@/hooks/user";
import StartPaying from "../website/StartPaying";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const DashboardComponent = () => {
  const { user, isLoading } = useCurrentUser();
  const hasUserPaid = useHasUserPaid();
  if (isLoading)
    return (
      <>
        <div className="flex flex-col items-center justify-center py-32 gap-3 opacity-60">
          <Loader2 className="animate-spin" size={30} />
          <span className="text-sm">Getting things ready</span>
        </div>
      </>
    );
  if (!hasUserPaid) return <StartPaying />;
  return <div>DashboardComponent</div>;
};
export default DashboardComponent;
