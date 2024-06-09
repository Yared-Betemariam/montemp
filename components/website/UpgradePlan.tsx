import { createStripeSession } from "@/actions/stripe";
import { pricingPlan } from "@/data/website";
import { useCurrentUser } from "@/hooks/user";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const UpgradePlan = ({
  plan,
  text,
  simple,
  disabled,
}: {
  plan: (typeof pricingPlan)[0];
  text?: string;
  simple?: boolean;
  disabled?: boolean;
}) => {
  const { user } = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleUpgrade = () => {
    startTransition(() => {
      createStripeSession(user?.id as string, plan)
        .then((data) => {
          if (data?.url) {
            router.push(data.url);
          }
        })
        .catch((error) => console.log(error));
    });
  };
  const getFormattedaymentLink = () => {
    return `${
      (plan?.paymentLink?.toString() +
        "?prefilled_email=" +
        user?.email) as string
    }`;
  };
  return (
    <div className="mb-3 ">
      {user && plan.price > 0 ? (
        <Button
          disabled={isPending || disabled}
          onClick={() => handleUpgrade()}
          size={simple ? "default" : "lg"}
          className={cn(
            "drop-shadow-md  w-full",
            simple ? "rounded-xl space-x-2" : "rounded-full space-x-3"
          )}
        >
          {isPending && (
            <Loader2 className="animate-spin opacity-80" size={17.5} />
          )}
          <span>{text || "Upgrade now"}</span>
          {!isPending && <ArrowRight size={16} />}
        </Button>
      ) : (
        <Link href={"/auth/sign-in"}>
          <Button
            disabled={disabled}
            size={simple ? "default" : "lg"}
            className={cn(
              "drop-shadow-md  w-full",
              simple ? "rounded-xl" : "rounded-full"
            )}
          >
            <span>Get started</span>
          </Button>
        </Link>
      )}
    </div>
  );
};
export default UpgradePlan;
