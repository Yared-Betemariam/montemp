"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/user";
import { FaSignOutAlt } from "react-icons/fa";
import LogoutButton from "../auth/SignoutButton";
import { Button } from "../ui/button";
import { CreditCard } from "lucide-react";
import { ModalWrapper } from "../ModelWrapper";
import BillingComponent from "../dashboard/BillingComponent";
import Link from "next/link";

const Account = () => {
  const { user, isLoading } = useCurrentUser();
  if (isLoading) {
    return (
      <Avatar className="animate-pulse rounded-xl">
        <AvatarFallback className="bg-black/40 rounded-xl">
          <div
            role="status"
            className="flex items-center justify-center h-full w-full bg-neutral-300 rounded-lg animate-pulse dark:bg-neutral-700"
          >
            {/* <FcMenu className="w-4 h-4 text-gray-200/40 dark:text-gray-600/40" /> */}
          </div>
        </AvatarFallback>
      </Avatar>
    );
  }
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="px-0">
        <Button variant={"ghost"} className="rounded-xl simpleborder">
          {/* <span className="text-base text-semibold opacity-80"> 
              {user?.name}
            </span> */}
          <Avatar className="rounded-xl">
            <AvatarImage
              src={user.image ? user.image : undefined}
              className="rounded-xl"
            />
            <AvatarFallback className="bg-sky-600 text-gray-100 rounded-xl text-base">
              {user?.email?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[12rem] mr-3 mt-1">
        <DropdownMenuLabel className="min-w-[12rem]">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="min-w-[12rem]" />
        {/* <DropdownMenuItem className="min-w-[12rem]"> */}
        <Link href={"/dashboard/billing"}>
          <DropdownMenuItem className="w-full items-center justify-start gap-2">
            <CreditCard size={18} />
            <span>Billing</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator className="min-w-[12rem]" />
        <LogoutButton>
          <DropdownMenuItem className="min-w-[12rem]">
            <FaSignOutAlt className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Account;
