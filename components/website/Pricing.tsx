/* eslint-disable react/no-unescaped-entities */
"use client";

import { pricingPlan } from "@/data/website";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { Card } from "../ui/card";
import UpgradePlan from "./UpgradePlan";
import { useUserPlan } from "@/hooks/user";

const Pricing = ({ modal }: { modal?: boolean }) => {
  let plans = pricingPlan.slice();
  if (modal) {
    plans = plans.filter((item) => item.price > 0);
  }
  const planId = useUserPlan();
  return (
    <section
      id="Pricing"
      className={cn(
        "w-full",
        !modal && "py-24 bg-gray-100 border-y border-primary/50"
      )}
    >
      <div
        className={cn("px-4 md:px-6 flex flex-col gap-12", !modal && "wrapper")}
      >
        {!modal && (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg font-semibold text-primary">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Make your product a{" "}
                <span className="text-primary"> no-brainer</span> purchase
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Choose the plan that best fits your current need.
              </p>
            </div>
          </div>
        )}
        <div
          className={cn(
            "mx-auto grid gap-10",
            !modal
              ? "px-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "py-4 grid-cols-2"
          )}
        >
          {plans.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm xll:p-8 dark:border-gray-800 dark:bg-gray-950 relative drop-shadow-md gap-1 max-w-[22.5rem]",
                item.tag === "Popular"
                  ? "ring-[2.5px] ring-primary"
                  : "simpleborder"
              )}
            >
              {item.tag === "Popular" && (
                <span className="bg-primary text-gray-200 h-8 px-4 rounded-xl shadow  absolute -top-4 text-base flex items-center justify-center mx-auto font-semibold">
                  Popular
                </span>
              )}
              <div className="space-y-1">
                <h3 className="text-2xl font-bold">{item.name}</h3>
                <p className="text-gray-900/70 dark:text-gray-400 text-base font-normal">
                  {item.desc}
                </p>
              </div>
              <div className="my-4 flex items-end space-x-3">
                <span className="text-base font-semibold line-through  opacity-70">
                  ${item.disCountPrice}{" "}
                </span>
                <span className="text-4xl font-bold flex items-end gap-1">
                  ${item.price}
                  <span className="text-base font-medium opacity-80">
                    {item.id === "free"
                      ? "/forever"
                      : item.id.startsWith("subscription")
                      ? "/month"
                      : item.id.startsWith("oneTimePayment") && "/once"}
                  </span>
                </span>
              </div>
              <ul className="mb-8 space-y-1 text-gray-500 dark:text-gray-400 text-base flex-1">
                {item.features.map((items) => (
                  <li key={items} className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    {items}
                  </li>
                ))}
              </ul>
              <UpgradePlan
                disabled={planId == item.id && planId !== "free"}
                plan={item}
              />
              {item.id.startsWith("oneTimePayment") && (
                <span className="text-sm opacity-70 mx-auto">
                  Pay once. Access forever
                </span>
              )}
              {planId == item.id && (
                <span className="bg-primary drop-shadow-md simpleborder p-1 rounded-lg opacity-90 ring-2 absolute -right-4 text-gray-50 mr-auto text-xs px-2">
                  Current Plan
                </span>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Pricing;
