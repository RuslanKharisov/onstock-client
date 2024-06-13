import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { dbClient } from "@/shared/lib/db"
import authConfig from "./auth.config"

const prisma = new PrismaClient()

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(dbClient),
  session: { strategy: "jwt" },
  ...authConfig,
})
