import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/shared/lib/routes"
import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req

  // Извлекаем sessionToken из куки
  const sessionToken = req.cookies.get("sessionToken")?.value

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // Проверка сессии: запрос к вашему API
  let isLoggedIn = false
  let userId: string | null = null;
  
  if (sessionToken) {
    try {
      const { payload } = await jwtVerify(sessionToken, new TextEncoder().encode(process.env.JWT_SECRET));
      userId = (payload as { sub: string }).sub;
      isLoggedIn = true;
    } catch (error) {
      console.error("Ошибка верификации токена:", error);
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
