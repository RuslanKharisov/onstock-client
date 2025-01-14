import NextAuth, { BackendTokens } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Yandex from "next-auth/providers/yandex"
import { LoginSchema } from "./_domain/schemas"
import { jwtVerify } from "jose"
import { loginUser } from "./api/login-user"
import { createUser } from "./api/create-user"
import { refreshToken } from "./api/refresh-token"
import { getUserByEmail } from "./api/get-user-by-email"

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
        console.log("Credentials received:", credentials)
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          try {
            const res = await loginUser(validatedFields.data)

            if (res.error) {
              throw new Error(res.error)
            }

            return {
              ...res.user,
              backendTokens: res.backendTokens,
            }
          } catch (error) {
            console.error("Login error:", error)
            return null
          }
        }
        console.error("Validation error:", validatedFields.error)
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // signOut: "/",
    error: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false

      const existingUser = await getUserByEmail(user.email)
      if (!existingUser) {
        const res = await createUser({
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
      }
      return true
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
          const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
          await jwtVerify(token.backendTokens.accessToken, secret)
        } catch (error) {
          console.log(
            "Access token validation failed, attempting refresh...",
            error,
          )
          try {
            const refreshedToken = await refreshToken(token)
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
  debug: true,
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
})
