import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { getUserByEmail } from "./data/user";
import connectDB from "./mongoose/db";
import Users from "./mongoose/models/user";

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
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      try {
        const user = await getUserByEmail(token.email as string);
        if (!user) return token;

        token.picture = user.image;
        token.sub = String(user._id);

        return token;
      } catch (error) {
        console.log(error);
        return token;
      }
    },
    async signIn({ profile }) {
      try {
        await connectDB();
        const user = await getUserByEmail(profile?.email as string);
        if (!user) {
          await Users.create({
            email: profile?.email,
            image: profile?.picture,
            name: profile?.name,
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
