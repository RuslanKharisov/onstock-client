import NextAuth, { BackendTokens } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Yandex from "next-auth/providers/yandex"
import { LoginSchema } from "./_domain/schemas"
import {
  loginUserAPI,
  refreshTokenApi,
} from "@/shared/api/auth"
import { jwtVerify } from "jose"
import { createUserAPI } from "@/shared/api/user/create-user"

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
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          // const { email, password } = validatedFields.data

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
    async signIn({ user, account }) {
      if (!account) return false

      const res = await createUserAPI({
        name: user.name as string,
        email: user.email as string,
        password: "",
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        type: account.type,
        image: user.image,
      })

      if (res.user) {
        user.backendTokens = res.backendTokens
        user.id = res.user.id
        return true
      } else {
        return false
      }
    },
    async session({ session, token }) {
      session.user.id = token.sub as string
      session.user.name = token.name as string
      session.user.email = token.email as string
      session.backendTokens = token.backendTokens as BackendTokens
      session.provider = token.provider as string
      return session
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name
        token.email = user.email
        token.provider = account?.provider
        token.backendTokens = user.backendTokens
      }

      // Валидация токенов с backendTokens для Credentials
      if (token.backendTokens?.accessToken) {
        try {
          const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
          await jwtVerify(token.backendTokens.accessToken, secret)
        } catch {
          // В случае ошибки валидации попытка обновления
          try {
            const refreshedToken = await refreshTokenApi(token)
            if (refreshedToken)
              token.backendTokens = refreshedToken.backendTokens
          } catch (refreshError) {
            console.error("Ошибка при обновлении токена:", refreshError)
          }
        }
      }
      return token
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
})
