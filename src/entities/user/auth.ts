import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { dbClient } from "@/shared/lib/db"
import { userRepository } from "./_repositories/user"
import { ROLE } from "@prisma/client"
import { tokenRepository } from "./_repositories/token"
import { UserEntity } from "./_domain/types"
import { accountRepository } from "./_repositories/account"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: ROLE
      isTwoFactorEnabled: boolean
      isOAuth: boolean
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

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation =
          await tokenRepository.getTwoFactorConfirmationByUserId(
            existingUser.id,
          )

        if (!twoFactorConfirmation) return false

        await tokenRepository.deleteTwoFactorConfirmation(
          twoFactorConfirmation.id,
        )
      }

      return true
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as ROLE
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }
      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await userRepository.getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await accountRepository.getAcount(existingUser.id)
      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
  },
  adapter: PrismaAdapter(dbClient),
  session: { strategy: "jwt" },
  ...authConfig,
})
