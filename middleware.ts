import authConfig from "@/entities/user/auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  console.log("🚀 ~ auth ~ isLoggedIn:", isLoggedIn)
  console.log("🚀 ~ auth ~ Current Route is:", req.nextUrl.pathname)
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
