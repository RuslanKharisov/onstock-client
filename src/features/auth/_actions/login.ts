"use server"

import * as z from "zod"
import { signIn } from "@/entities/user/auth"
import { LoginSchema } from "@/entities/user/_domain/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/shared/lib/routes"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache"
import { userRepository } from "@/entities/user/_repositories/user"
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/shared/lib/mail"
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/entities/user/lib/generate-token"
import { tokenRepository } from "@/entities/user/_repositories/token"
import { dbClient } from "@/shared/lib/db"
import { escape } from "querystring"
import { error } from "console"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Не корректные данные!" }
  }

  const { email, password, code } = validatedFields.data

  const existingUser = await userRepository.getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Пользователь с данным Email не зарегистрирован" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    )

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )
    return {
      success: "На указанную почту отправлено письмо для подтверждения адреса!",
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await tokenRepository.getTwoFactorTokenByEmail(
        existingUser.email,
      )
      if (!twoFactorToken) {
        return { error: "Код неверный!" }
      }
      if (twoFactorToken.token !== code) {
        return { error: "Код неверный" }
      }

      const haseExpired = new Date(twoFactorToken.expires) < new Date()

      if (haseExpired) {
        return { error: "Истек срок действия кода!" }
      }

      await tokenRepository.deleteTwoFactorToken(twoFactorToken.id)

      const existingConfirmation =
        await tokenRepository.getTwoFactorConfirmationByUserId(existingUser.id)
      if (existingConfirmation) {
        await tokenRepository.deleteTwoFactorConfirmation(
          existingConfirmation.id,
        )
      }
      await tokenRepository.createTwoFactorConfirmationByUserId(existingUser.id)
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
      return { twoFactor: true }
    }
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
