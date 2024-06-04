import { Crown, CrownIcon } from "lucide-react";
import { ModalWrapper } from "../ModelWrapper";
import { Button } from "../ui/button";
import { IoFlash } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import Pricing from "../website/Pricing";

//
const UpgradeModal = () => {
  return (
    <ModalWrapper
      className="min-w-[50rem] bg-transparent shadow-none p-0 rounded-none border-none"
      trigger={
        <Button
          variant={"outline"}
          className="items-center justify-start gap-2 px-3.5 rounded-xl drop-shadow"
        >
          {/* <CreditCard size={18} /> */}
          <CrownIcon size={18} className="fill-yellow-600 text-yellow-600" />
          <span>Upgrade</span>
        </Button>
      }
    >
      <div className="flex flex-col bg-gray-50 rounded-xl drop-shadow-md px-8 py-6">
        <h2 className="text-center text-3xl font-semibold mb-4">
          Upgrade Plan
        </h2>
        <Pricing modal />
      </div>
    </ModalWrapper>
  );
};
export default UpgradeModal;
