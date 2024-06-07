"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "./Header";
import { Button, buttonVariants } from "./ui/button";
import Logo from "./Logo";
import Separator from "./Separator";
import LoginButton from "./auth/LoginButton";
import { IoIosArrowForward } from "react-icons/io";
import Account from "./header/Account";
import { useCurrentUser } from "@/hooks/user";
import { Avatar, AvatarFallback } from "./ui/avatar";

const MobileNav = () => {
  const { user, isLoading } = useCurrentUser();
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(`#${window.location.href.split("#")[1]}`);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild className="px-0 lg:hidden">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-xl simpleborder drop-shadow hover:opacity-90 transition-all duration-200 flex flex-col items-center justify-center"
        >
          <Menu size={22} className="drop-shadow" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-transparent shadow-none border-none p-0 m-4">
        <div className="bg-white rounded-xl p-8 px-10 drop-shadow-md flex flex-col gap-6">
          <Logo />
          <Separator />
          <div className="flex flex-col gap-2 items-start">
            {navLinks.map((item) => (
              <SheetClose key={item.name} className="items-start justify-start">
                <a
                  href={item.path}
                  key={item.name}
                  onClick={() => setPathname(item.path)}
                  className={cn(
                    pathname === item.path
                      ? "font-semibold text-primary"
                      : "opacity-70"
                  )}
                >
                  {item.name}
                </a>
              </SheetClose>
            ))}
          </div>
          <div className="flex flex-col">
            {user && (
              <div className="items-center gap-3 flex">
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
              </div>
            )}
            {!isLoading && !user && (
              <LoginButton>
                <Button className="rounded-full px-6">Sign in</Button>
              </LoginButton>
            )}
            {isLoading && (
              <Avatar className="w-20 rounded-xl">
                <AvatarFallback className="animate-pulse rounded-xl">
                  <div
                    role="status"
                    className="flex items-center justify-center h-full w-full bg-black/10 rounded-lg"
                  ></div>
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
