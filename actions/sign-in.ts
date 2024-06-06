"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { defaultPlanId } from "@/data/website";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import connectDB from "@/mongoose/db";
import Users from "@/mongoose/models/user";
import { defauthLoginRedirect } from "@/routes";
import { signinForm } from "@/schemas";
import * as z from "zod";

export const sign_in_google = async () => {
  await signIn("google", {
    redirectTo: defauthLoginRedirect,
  });
};

export const sign_in = async (values: z.infer<typeof signinForm>) => {
  const validatedValues = signinForm.safeParse(values);
  if (!validatedValues.success) return { error: "Invalid fields" };
  try {
    await connectDB();

    const { email } = validatedValues.data;

    let user = await getUserByEmail(email);
    if (!user) {
      user = await Users.create({ email: email, planId: defaultPlanId });
    }

    const token = await generateVerificationToken(email);

    await sendVerificationEmail(token.email, token.token);

    return { success: "Verification email sent!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
