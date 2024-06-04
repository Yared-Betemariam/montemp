import { auth } from "./auth";
import {
  apiAuthPrefix,
  apiAuthUserPrefix,
  authRoutes,
  defauthLoginRedirect,
  publicRoutes,
} from "./routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthApiRoute =
    nextUrl.pathname.startsWith(apiAuthPrefix) ||
    nextUrl.pathname.startsWith(apiAuthUserPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthApiRoute) return;
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(defauthLoginRedirect, nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/sign-in", nextUrl));
  }
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
