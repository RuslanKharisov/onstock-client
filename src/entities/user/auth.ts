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
  pages: {
    signIn: "./auth/login",
  },
  events: {
    async linkAccount({ user }) {
      await dbClient.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Если провайдер не "credentials", разрешаем вход
      if (account?.provider !== "credentials") return true

      const existingUser = await userRepository.getUserById(user.id)

      // Если Email не подтвержден, вход не разрешаем
      if (!existingUser?.emailVerified) return false

      // TODO: Add 2FA check
      return true
    },

    async session({ token, session }) {
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
