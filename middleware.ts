import authConfig from "@/entities/user/auth.config"
import NextAuth from "next-auth"
const { auth } = NextAuth(authConfig)

import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/shared/lib/routes"
import { NextRequest, NextResponse } from "next/server"
import { AppRouteHandlerFnContext } from "node_modules/next-auth/lib/types"

export default auth(
  async (
    req,
    ctx: AppRouteHandlerFnContext,
  ): Promise<Response | void> => {
    const { nextUrl } = req
    console.log("🚀 ~ req:", req.auth)
    console.log("🚀 ~ auth ~ nextUrl:", nextUrl.pathname)

    const isLoggedIn = !!req.auth
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
      console.log("🚀 ~ auth ~ isApiAuthRoute:")
      return 
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        console.log("🚀 ~ auth ~ isAuthRoute:")
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
      return 
    }

    if (!isLoggedIn && !isPublicRoutes) {
      console.log("🚀 ~ auth ~ !isLoggedIn && !isPublicRoutes:")
      return NextResponse.redirect(new URL("/auth/login", nextUrl))
    }

    return 
  },
)

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
