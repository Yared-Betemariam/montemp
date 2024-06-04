import SigninForm from "@/components/auth/SigninForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "",
};
const page = () => {
  return <SigninForm />;
};
export default page;
