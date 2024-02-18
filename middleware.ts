import NextAuth, { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';

import authConfig from './auth.config';

// routes
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminPrefix,
} from './routes';

const { auth } = NextAuth(authConfig);

const secret = process.env.AUTH_SECRET as string;

export default auth(async (req) => {
  const { nextUrl } = req;

  // @ts-ignore
  const token = await getToken({ req, secret });

  // get user role
  const userRole = token?.role;

  //  check if user is logged in
  const isLoggedIn = !!req.auth;

  // check if user visited the auth api route
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // check if user visited the admin route
  const isAdminROute = nextUrl.pathname.startsWith(adminPrefix);

  //check if user visited the public route
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // check if user visited the auth route
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  // redirect user to default redirect if user is logged on
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  // redirect user to default redirect if non-admin user is logged on
  if (isLoggedIn) {
    if (isAdminROute && userRole !== 'ADMIN') {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  // return user to last visited page before logging in
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    // encode callback url
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
