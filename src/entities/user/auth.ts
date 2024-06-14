import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { dbClient } from "@/shared/lib/db"
import { userRepository } from "./_repositories/user"
import { ROLE } from "@prisma/client"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: ROLE
      customeFieldTemplate: string
    } & DefaultSession["user"]
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // колбэк для проверки записи в БД прошла ли верификацию указанная при регистрации почта
    // async signIn({ user }) {
    //   const existingUser = await userRepository.getUserById(user.id)
    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false
    //   }
    //   return true
    // },
    async session({ token, session }) {
      console.log("🚀 ~ session token:", token)
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as ROLE
      }

      session.user.customeFieldTemplate = "some custom field"

      return session
    },
    async jwt({ token }) {
      console.log("🚀 ~ jwt ~ token:", token)

      if (!token.sub) return token
      const existingUser = await userRepository.getUserById(token.sub)
      if (!existingUser) return token
      token.role = existingUser.role
      return token
    },
  },
  adapter: PrismaAdapter(dbClient),
  session: { strategy: "jwt" },
  ...authConfig,
})
