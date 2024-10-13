import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Yandex from "next-auth/providers/yandex"
import { LoginSchema } from "./_domain/schemas"
import { loginUserAPI, refreshTokenApi } from "@/shared/api/auth"

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
            // console.log("🚀 ~ authorize ~ response from api:", res)
            if (res.status === 401) {
              return null // неавторизованный пользователь
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
      // const { backendTokens } = user
      if (user) {
        token.name = user.name;
        token.backendTokens = user.backendTokens;
        return token
      }       
      // const accessToken = backendTokens.refreshToken
      // Проверяем время жизни токена
      // if (new Date().getTime() < token.backendTokens.expiresIn) {
        // const refreshRes = await refreshTokenApi(accessToken)
        //  console.log("🚀 ~ jwt ~ refreshRes:", refreshRes)
      //     return token;
      // }
      // console.log("if no user token", token)

       return token

    },
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET
})

