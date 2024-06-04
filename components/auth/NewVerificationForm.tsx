"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CardWrapper from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState, useTransition } from "react";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { defauthLoginRedirect } from "@/routes";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();

  // const searchParams = useSearchParams();
  const token = 'searchParams.get("token")';

  const onSubmit = useCallback(() => {
    if (error || success) {
      return;
    }

    if (!token) {
      setError("Missing token");
      return;
    }

    newVerification(token as string).then((data) => {
      setError(data?.error || undefined);
      if (data.redirect) {
        location.reload();
      }
    });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      center
      headerLabel="Confirming your identity"
      backButtonHref="/auth/sign-in"
      backButtonLabel="Back to Sign in"
    >
      <div className="flex items-center w-full justify-center">
        {!error && !success && <BeatLoader />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
export default NewVerificationForm;
