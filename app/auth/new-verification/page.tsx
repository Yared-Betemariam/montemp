import NewVerificationForm from "@/components/auth/NewVerificationForm";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  );
};
export default page;
