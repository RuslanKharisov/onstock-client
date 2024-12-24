import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/shared/lib/routes";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/shared/lib/auth-ulils";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  console.log("🚀 ~ middleware ~ req:", req)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("🚀 ~ middleware ~ process.env.AUTH_SECRET:", process.env.AUTH_SECRET)
  console.log("🚀 ~ middleware ~ token:", token)
  let isLoggedIn = false;

  if(!token) isLoggedIn = false;
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  
  if (token?.provider == 'credentials') {
    // Проверяем наличие backendTokens и accessToken
    if (token?.backendTokens?.accessToken) {
      const isValid = await verifyToken(token.backendTokens.accessToken);
      if (isValid) {
        isLoggedIn = true;
      } else {
        isLoggedIn = false;
        console.error("Статус: session expired");
      }
    } else {
      console.error("Статус: session does not contain valid tokens");
    }
  } if (token?.exp) {
    const ts = Date.now()/1000;
    console.log(ts)
    if(token.exp > ts) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
      console.error("Статус: session expired");
    }
  }

  // Если это API аутентификации, просто продолжаем выполнение
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Если пользователь зашёл на страницу авторизации, но уже вошёл в систему, перенаправляем его
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Если пользователь не вошёл и страница не является публичной, перенаправляем на логин
  if (!isLoggedIn && !isPublicRoutes) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
