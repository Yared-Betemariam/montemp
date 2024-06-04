import ErrorCard from "@/components/auth/ErrorCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "An error occured",
  description: "",
};

const page = () => {
  return <ErrorCard />;
};
export default page;
