"use client";

import DashboardHeader from "./DashboardHeader";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
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
