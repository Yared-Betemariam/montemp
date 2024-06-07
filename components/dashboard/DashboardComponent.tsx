"use client";

import { useHasUserPaid } from "@/hooks/user";
import StartPaying from "../website/StartPaying";
import { useEffect } from "react";

const DashboardComponent = () => {
  const hasUserPaid = useHasUserPaid();
  if (!hasUserPaid) return <StartPaying />;
  return <div>DashboardComponent</div>;
};
export default DashboardComponent;
