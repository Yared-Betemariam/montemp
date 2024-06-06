import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { createUserAPI, getUserByEmailAPI } from "./data/api";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  session: { strategy: "jwt" },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.planId = token.planId as string;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      try {
        const user = await getUserByEmailAPI(token.email as string);
        if (!user) return token;

        token.sub = String(user._id);
        token.planId = String(user.planId);

        return token;
      } catch (error) {
        console.log(error);
        return token;
      }
    },
    async signIn({ profile }) {
      try {
        const user = await getUserByEmailAPI(profile?.email as string);
        if (!user) {
          await createUserAPI({
            email: profile?.email || undefined,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  ...authConfig,
});
