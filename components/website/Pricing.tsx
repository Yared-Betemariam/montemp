/* eslint-disable react/no-unescaped-entities */
"use client";

import { ArrowRight, CheckIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { pricingPlan } from "@/data/website";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/user";
import Link from "next/link";
import { createStripeSession } from "@/actions/stripe";
import { redirect, useRouter } from "next/navigation";
import { model } from "mongoose";

const Pricing = ({ modal }: { modal?: boolean }) => {
  const { user } = useCurrentUser();
  const router = useRouter();
  const handleUpgrade = () => {
    createStripeSession()
      .then((data) => {
        if (data?.url) {
          router.push(data.url);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <section
      id="Pricing"
      className={cn(
        "w-full",
        !modal && "py-24 bg-gray-100 border-y border-primary/50"
      )}
    >
      <div className="container px-4 md:px-6 flex flex-col gap-12">
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
            "mx-auto grid max-w-5xl grid-cols-2 gap-12",
            !modal ? "px-16" : "py-4"
          )}
        >
          {pricingPlan.map((item) => (
            <Card
              key={item.desc}
              className={cn(
                "flex flex-col rounded-3xl border border-gray-200 bg-white p-10 shadow-sm dark:border-gray-800 dark:bg-gray-950 relative drop-shadow-md",
                item.tag === "Popular"
                  ? "border-primary border-2"
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
                <p className="text-gray-500 dark:text-gray-400 text-base">
                  {item.desc}
                </p>
              </div>
              <div className="my-4 flex items-end space-x-2">
                <span className="text-lg font-semibold line-through  opacity-70">
                  ${item.disCountPrice}
                </span>
                <span className="text-4xl font-bold">${item.price}</span>
              </div>
              <ul className="mb-8 space-y-1 text-gray-500 dark:text-gray-400 text-base flex-1">
                {item.features.map((items) => (
                  <li key={items} className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    {items}
                  </li>
                ))}
              </ul>
              {user ? (
                item.price <= 0 ? (
                  <Link href={"/auth/sign-in"}>
                    <Button size={"lg"} className="rounded-full w-full">
                      <span>Get started</span>
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => handleUpgrade()}
                    size={"lg"}
                    className="rounded-full w-full space-x-3"
                  >
                    <span>Upgrade now</span>
                    <ArrowRight size={16} />
                  </Button>
                )
              ) : (
                <Link href={"/auth/sign-in"}>
                  <Button size={"lg"} className="rounded-full w-full">
                    <span>Get started</span>
                  </Button>
                </Link>
              )}
              <span className="text-sm opacity-70 mx-auto mt-3">
                Pay once. Access forever
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Pricing;
