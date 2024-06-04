"use client";

import { sign_in } from "@/actions/sign-in";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinForm } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardWrapper from "./CardWrapper";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import Link from "next/link";

const SigninForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<undefined | string>();
  const [error, setError] = useState<undefined | string>();

  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      if (resendIn > 0) {
        setResendIn((prev) => prev - 1);
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  const searchParams = useSearchParams();
  const errorParams = searchParams.get("error");
  useEffect(() => {
    if (errorParams == "OAuthAccountNotLinked")
      setError("Email already in use");
  }, [errorParams]);

  const form = useForm<z.infer<typeof signinForm>>({
    resolver: zodResolver(signinForm),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof signinForm>) {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      sign_in(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data.success);
          setResendIn(30);

          // if (data.redirect) location.reload();
        })
        .catch(() => setError("Something  went wrong"));
    });
  }

  return (
    <CardWrapper headerLabel="Sign in" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Email"
                      className="px-4 h-12"
                      formtype
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {resendIn > 0 && (
              <span className="ml-auto text-[13px] opacity-80">
                Resend in {resendIn}s
              </span>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="text-sm opacity-70 leading-6">
            <span>By signing in you will be agreeing to the </span>
            <Link
              target="_blank"
              href={"/terms"}
              className="underline text-blue-950/80"
            >
              Terms of services
            </Link>{" "}
            <span>and </span>
            <Link
              target="_blank"
              href={"/privacy-policy"}
              className="underline text-blue-950/80"
            >
              Privacy policys
            </Link>
          </div>
          <Button
            disabled={isPending || resendIn > 0}
            type="submit"
            className="w-full rounded-full"
          >
            {"Sign in"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SigninForm;
