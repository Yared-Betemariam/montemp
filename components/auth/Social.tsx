import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { sign_in_google } from "@/actions/sign-in";

const Social = () => {
  return (
    <Button
      variant={"outline"}
      onClick={() => sign_in_google()}
      className="space-x-4 w-full bg-white/80 h-[2.75rem] simpleborder rounded-full"
    >
      <FcGoogle size={17} />
      <span>Continue with Google</span>
    </Button>
  );
};
export default Social;
