import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiRoute,
  authRoutes,
  DEFAULT_LOGIN_ROUTE,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiRoute);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_ROUTE, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callback = nextUrl.pathname;
    if (nextUrl.search) {
      callback += nextUrl.search;
    }
    const encodedCallback = encodeURIComponent(callback);
    return Response.redirect(
      new URL(`/auth/login?callback=${encodedCallback}`, nextUrl)
    );
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
