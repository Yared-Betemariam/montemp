import NextAuth, { DefaultSession } from "next-auth";

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     paymentPlan: "BASIC" | "PRO" | "NONE" | null;
//   }
// }

declare module "next-auth" {
  interface Session {
    user: {
      paymentPlan: "BASIC" | "PRO" | "NONE" | null;
    } & DefaultSession["user"];
  }
}
