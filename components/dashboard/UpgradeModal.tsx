import { useCurrentUser, useUserPlan } from "@/hooks/user";
import { useUserSubscriptionPlan } from "@/store";
import { CrownIcon } from "lucide-react";
import { ModalWrapper } from "../ModelWrapper";
import { Button } from "../ui/button";
import Pricing from "../website/Pricing";

const UpgradeModal = () => {
  const { isLoading } = useCurrentUser();
  if (isLoading) {
    return (
      <div className="animate-pulse h-10 w-24 rounded-xl bg-black/10"></div>
    );
  }
  return (
    <ModalWrapper
      className="min-w-[50rem] bg-transparent shadow-none p-0 rounded-none border-none"
      trigger={
        <Button
          variant={"outline"}
          className="items-center justify-start gap-2 px-3.5 rounded-xl  simpleborder shadow-sm"
        >
          {/* <CreditCard size={18} /> */}
          <CrownIcon size={18} className="fill-yellow-500 text-yellow-500" />
          <span>Upgrade</span>
        </Button>
      }
    >
      <div className="flex flex-col bg-gray-50 rounded-2xl drop-shadow-md px-4 py-2">
        <h2 className="text-center text-3xl font-semibold mt-2 mb-2 md:mb-4">
          Upgrade Plan
        </h2>
        <Pricing modal />
      </div>
    </ModalWrapper>
  );
};
export default UpgradeModal;
