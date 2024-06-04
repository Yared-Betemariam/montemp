import { cn } from "@/lib/utils";
import Logo from "../Logo";

const Heading = ({ label, center }: { label?: string; center?: boolean }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        center && "justify-center items-center"
      )}
    >
      <Logo s />
      <span className="text-2xl opacity-75 font-extrabold tracking-wider">
        {label}
      </span>
    </div>
  );
};
export default Heading;
