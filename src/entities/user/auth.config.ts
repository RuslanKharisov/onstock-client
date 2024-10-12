import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import Yandex from "next-auth/providers/yandex"
import { LoginSchema } from "./_domain/schemas"
import { CredentialsSignin, NextAuthConfig } from "next-auth"
import { loginUserAPI } from "@/shared/api/auth"

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

export default {
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
          const { email, password } = validatedFields.data

          try {
            const res = await loginUserAPI(validatedFields.data)

            if (res.status === 401) {
              return null // неавторизованный пользователь
            }

            const user = await res.json() // получаем пользователя
            return user
          } catch (error) {
            console.error("Error in authorize:", error)
            return null
          }
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
