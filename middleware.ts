import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/shared/lib/routes"
import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose";
import { auth } from "@/entities/user/auth";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req
  const session = await auth()

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  let isLoggedIn = false
  
  if (session) {
    const currentTime = new Date().getTime();
    const sessionExpiryTime = new Date(session.expires).getTime();
    
    if (currentTime < sessionExpiryTime) {
      isLoggedIn = true;
    } else  {
      isLoggedIn = false;
      console.error("Статус: session expired");
    }
  }

  // Если это API аутентификации, просто продолжаем выполнение
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // Если пользователь зашёл на страницу авторизации, но уже вошёл в систему, перенаправляем его
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  // Если пользователь не вошёл и страница не является публичной, перенаправляем на логин
  if (!isLoggedIn && !isPublicRoutes) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
