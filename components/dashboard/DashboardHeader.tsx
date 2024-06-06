import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Logo from "../Logo";
import Account from "../header/Account";
import { Button } from "../ui/button";
import UpgradeModal from "./UpgradeModal";
import { IoIosArrowForward } from "react-icons/io";

const DashboardHeader = () => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        " border-b border-gray-900/20 bg-neutral-50/40 flex items-center px-4 sm:px-6 h-[4.25rem]"
      )}
    >
      <div className={`flex items-center justify-between flex-1`}>
        <div className="flex items-center space-x-3">
          {pathname.startsWith("/dashboard/") && (
            <Link href={"/dashboard"}>
              <Button
                className="space-x-0 w-[2.25rem] h-[2.25rem] p-2.5 simpleborder hover:bg-black/5 rounded-xl"
                variant={"ghost"}
              >
                <FaArrowLeft size={12} />
              </Button>
            </Link>
          )}
          <Logo lo s />
          <div className="flex items-center space-x-2 px-1 text-gray-900/85">
            <span className="text-base font-bold">Dashboard</span>
            {/* { sth && pathname !== "/dashboard" && (
              <>
                <IoIosArrowForward className="text-base" />
                <span className="text-base font-semibold text-gray-900/95">
                  {sth}
                </span>
              </>
            )} */}
            {pathname.startsWith("/dashboard/billing") && (
              <>
                <IoIosArrowForward className="text-base" />
                <span className="text-base font-semibold">Billing</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <UpgradeModal />
          <Account />
        </div>
      </div>
    </div>
  );
};
export default DashboardHeader;
