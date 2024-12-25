import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/shared/lib/routes"
import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/shared/lib/auth-ulils"
import { auth } from "@/entities/user/auth"

export async function middleware(req: NextRequest) {
  const { nextUrl } = req
  const session = await auth()
  let isLoggedIn = false

  if (!session) isLoggedIn = false

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (session?.provider == "credentials") {
    // Проверяем наличие backendTokens и accessToken
    if (session?.backendTokens?.accessToken) {
      const isValid = await verifyToken(session.backendTokens.accessToken)
      if (isValid) {
        isLoggedIn = true
      } else {
        isLoggedIn = false
        console.error("Статус: session expired")
      }
    } else {
      console.error("Статус: session does not contain valid tokens")
    }
  }
  if (session?.expires) {
    const expirationDate = new Date(session.expires)
    const expTimeInSec = expirationDate.getTime() / 1000
    const curTimeInSec = Date.now() / 1000
    console.log("Истекает:", new Date(expTimeInSec * 1000))
    console.log("Действителен до:", new Date(curTimeInSec * 1000))
    if (expTimeInSec > curTimeInSec) {
      isLoggedIn = true
    } else {
      isLoggedIn = false
      console.error("Статус: session expired")
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
