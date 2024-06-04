"use client";

import { useCurrentUser } from "@/hooks/user";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import LoginButton from "./auth/LoginButton";
import Account from "./header/Account";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import { IoIosArrowForward } from "react-icons/io";

export const navLinks = [
  {
    name: "Testimonials",
    path: "#Testimonials",
  },
  {
    name: "Pricing",
    path: "#Pricing",
  },
  {
    name: "FAQ",
    path: "#FAQ",
  },
];

const Header = () => {
  const { user, isLoading } = useCurrentUser();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(`#${window.location.href.split("#")[1]}`);
  }, []);

  return (
    <header className=" h-20 bg-neutral-50/15 border-b border-gray-950/[0.12]">
      <section className="wrapper h-full flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="flex items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setPathname(item.path)}
                className={cn(
                  pathname === item.path
                    ? "font-semibold text-primary"
                    : "opacity-70"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          {user && (
            <div className="flex items-center gap-3">
              <Link
                href={"/dashboard"}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-xl simpleborder space-x-3"
                )}
              >
                <span>Go to Dashboard</span>
                <IoIosArrowForward />
              </Link>
              <Account />
            </div>
          )}
          {!isLoading && !user && (
            <>
              <LoginButton>
                <Button className="rounded-full px-6">Sign in</Button>
              </LoginButton>
            </>
          )}
          {isLoading && (
            <Avatar className="w-20">
              <AvatarFallback className="animate-pulse">
                <div
                  role="status"
                  className="flex items-center justify-center h-full w-full bg-neutral-800/20 rounded-lg"
                ></div>
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </section>
    </header>
  );
};
export default Header;
