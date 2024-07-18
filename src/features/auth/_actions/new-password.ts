"use server"

import { NewPasswordSchema } from "@/entities/user/_domain/schemas"
import { tokenRepository } from "@/entities/user/_repositories/token"
import { userRepository } from "@/entities/user/_repositories/user"
import bcrypt from "bcryptjs"
import { z } from "zod"

export const newPasword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token!" }
  }

  const validatedFields = NewPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Поля заполнены не корректно" }
  }

  const { password } = validatedFields.data
  const existingToken =
    await tokenRepository.getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: "invalid token!" }
  }

  const existingUser = await userRepository.getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: "Email does not exist!" }
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  await userRepository.updateUserPasword(existingUser, hashedPassword)
  await tokenRepository.deletePasswordResetToken(existingToken)

  return { success: "Пароль успешно обновлен!" }
}
