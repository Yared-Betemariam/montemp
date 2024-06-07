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
import { CreditCard, Mail, User } from "lucide-react";
import { ModalWrapper } from "../ModelWrapper";
import BillingComponent from "../dashboard/BillingComponent";
import Link from "next/link";

const Account = () => {
  const { user, isLoading } = useCurrentUser();
  if (isLoading) {
    return (
      <Avatar className="animate-pulse rounded-xl w-10 h-10">
        <AvatarFallback className="rounded-xl">
          <div
            role="status"
            className="flex items-center justify-center h-full w-full bg-black/10 rounded-lg "
          />
        </AvatarFallback>
      </Avatar>
    );
  }
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="px-0">
        <Button
          variant={"ghost"}
          className="rounded-xl simpleborder drop-shadow hover:opacity-85 transition-all duration-100"
        >
          <Avatar className="rounded-xl h-10 w-10 ring-1 border-black/70 bg-gradient-to-tr from-sky-600 to-indigo-600/75 flex flex-col items-center focus-visible:ring-offset-0 focus-visible:ring-ring/60 justify-center text-gray-50/80">
            <User size={25} className="drop-shadow" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[14rem] mr-3 mt-1">
        <DropdownMenuLabel className="min-w-[14rem] font-semibold opacity-80">
          Profile Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="min-w-[14rem]" />
        <DropdownMenuLabel className="min-w-[14rem] font-semibold space-x-2 flex items-center p-1">
          <User
            size={32}
            className="bg-black/10 rounded-xl drop-shadow simpleborder p-1.5"
          />
          <span className="text-semibold text-sm">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="min-w-[14rem]" />
        <Link href={"/dashboard/billing"}>
          <DropdownMenuItem className="w-full items-center justify-start gap-2">
            <CreditCard size={18} />
            <span>Billing</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="min-w-[14rem]" />
        <LogoutButton>
          <DropdownMenuItem className="min-w-[14rem]">
            <FaSignOutAlt className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Account;
