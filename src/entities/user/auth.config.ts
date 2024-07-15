import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import Yandex from "next-auth/providers/yandex"
import { LoginSchema } from "./_domain/schemas"
import { userRepository } from "./_repositories/user"
import { CredentialsSignin, NextAuthConfig } from "next-auth"

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

export default {
  providers: [
    Yandex({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET
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

          const user = await userRepository.getUserByEmail(email)
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }
        throw new InvalidLoginError()
      },
    }),
  ],
} satisfies NextAuthConfig
