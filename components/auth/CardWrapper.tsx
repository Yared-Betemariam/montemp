import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import BackButton from "./BackButton";
import Heading from "./Heading";
import Social from "./Social";

interface CardWrapperProps {
  children?: React.ReactNode;
  headerLabel: string;
  backButtonHref?: string;
  backButtonLabel?: string;
  showSocial?: boolean;
  hideChildren?: boolean;
  center?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  center,
  backButtonHref,
  backButtonLabel,
  showSocial,
  hideChildren,
}: CardWrapperProps) => {
  return (
    <div className="flex-col bg-gradient-to-tr max-w-[428px] w-full py-4 px-2">
      <div className="my-auto">
        <CardHeader>
          <Heading center={center} label={headerLabel} />
        </CardHeader>
        {!hideChildren && (
          <CardContent className="flex-1">{children}</CardContent>
        )}
        {showSocial && children && (
          <div className="flex gap-2 opacity-50 text-gray-900 items-center p-3 px-10 pt-0">
            <span className="flex-1 h-[.6px] bg-neutral-900/70 rounded-full"></span>
            <span className="text-sm">or</span>
            <span className="flex-1 h-[.6px] bg-neutral-900/70 rounded-full"></span>
          </div>
        )}
        {showSocial && (
          <CardFooter className="pb-4">
            <Social />
          </CardFooter>
        )}
        {!hideChildren && backButtonHref && backButtonLabel && (
          <CardFooter>
            <BackButton href={backButtonHref} label={backButtonLabel} />
          </CardFooter>
        )}
      </div>
    </div>
  );
};
export default CardWrapper;
