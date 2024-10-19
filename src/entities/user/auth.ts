import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Yandex from "next-auth/providers/yandex"
import { LoginSchema } from "./_domain/schemas"
import { loginUserAPI, refreshTokenApi } from "@/shared/api/auth"
import jwt from "jsonwebtoken"
import { jwtVerify } from "jose"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Yandex({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          try {
            const res = await loginUserAPI(validatedFields.data)
            if (res.status === 401) {
              return null 
            }
            return {
              ...res.user,
              backendTokens: res.backendTokens,
            }
          } catch (error) {
            console.error("Error in authorize:", error)
            return null
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string
      session.backendTokens = token.backendTokens
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        token.name = user.name
        token.backendTokens = user.backendTokens
      }

      if (token.backendTokens && token.backendTokens.accessToken) {
        try {
          const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
          const { payload } = await jwtVerify(
            token.backendTokens.accessToken,
            secret,
          )
          return token
        } catch (error) {
          console.error("Invalid token:", error)
        }
        try {
          const refreshedToken = await refreshTokenApi(token)
          if (refreshedToken) {
            return refreshedToken
          } else {
            console.error("Failed to refresh token")
            return token
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError)
          return token
        }
      }

      return token
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
})
