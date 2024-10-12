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
            console.log("🚀 ~ authorize ~ response from api:", res)
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
    console.log("🚀 ~ session ~ session:", session)

      
      session.user.name = token.name
      session.backendTokens = token.backendTokens
      return session
    },

    async jwt({ token, user }) {
      // const { backendTokens } = user
      if (user) {
        token.name = user.name;
        token.backendTokens = user.backendTokens;
        console.log("token" ,token)
        return token
      }       
      // const accessToken = backendTokens.refreshToken
      // Проверяем время жизни токена
      // if (new Date().getTime() < token.backendTokens.expiresIn) {
        // const refreshRes = await refreshTokenApi(accessToken)
        //  console.log("🚀 ~ jwt ~ refreshRes:", refreshRes)
      //     return token;
      // }
      console.log("if no user token", token)

       return token

    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
})

// callbacks: {
//   async signIn({ user, account }) {
//     // Если провайдер не "credentials", разрешаем вход
//     if (account?.provider !== "credentials") return true

//     const existingUser = await userRepository.getUserById(user.id)

//     // Если Email не подтвержден, вход не разрешаем
//     if (!existingUser?.emailVerified) return false

//     if (existingUser.isTwoFactorEnabled) {
//       const twoFactorConfirmation =
//         await tokenRepository.getTwoFactorConfirmationByUserId(
//           existingUser.id,
//         )

//       if (!twoFactorConfirmation) return false

//       await tokenRepository.deleteTwoFactorConfirmation(
//         twoFactorConfirmation.id,
//       )
//     }

//     return true
//   },

//   async session({ token, session }) {
//     if (token.sub && session.user) {
//       session.user.id = token.sub
//     }

//     if (token.role && session.user) {
//       session.user.role = token.role as ROLE
//     }

//     if (session.user) {
//       session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
//     }

//     if (session.user) {
//       session.user.name = token.name
//       session.user.email = token.email as string
//       session.user.isOAuth = token.isOAuth as boolean
//     }
//     return session
//   },

//   async jwt({ token }) {
//     if (!token.sub) return token
//     const existingUser = await userRepository.getUserById(token.sub)
//     if (!existingUser) return token

//     const existingAccount = await accountRepository.getAcount(existingUser.id)
//     token.isOAuth = !!existingAccount
//     token.name = existingUser.name
//     token.email = existingUser.email
//     token.role = existingUser.role
//     token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

//     return token
//   },
// },
// adapter: PrismaAdapter(dbClient),
// session: { strategy: "jwt" },
