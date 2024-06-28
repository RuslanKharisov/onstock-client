"use server"

import * as z from "zod"
import { signIn } from "@/entities/user/auth"
import { LoginSchema } from "@/entities/user/_domain/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/shared/lib/routes"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache"
import { userRepository } from "@/entities/user/_repositories/user"
import { sendVerifificationEmail } from "@/shared/lib/mail"
import { generateVerificationToken } from "@/entities/user/lib/generate-token"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Не корректные данные!" }
  }

  const { email, password } = validatedFields.data

  const existingUser = await userRepository.getUsByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Пользователь с данным Email не зарегистрирован" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    
    await sendVerifificationEmail(verificationToken.email, verificationToken.token)
    return { success: "На указанную почту отправлено письмо для подтверждения адреса!"}
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    revalidatePath(DEFAULT_LOGIN_REDIRECT)
    return { success: "Вход выполнен!" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Неверные учетные данные" }
        }
        default: {
          return { error: "Что-то пошло не так" }
        }
      }
    }
    throw error
  }
}
