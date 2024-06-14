"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/entities/user/_domain/schemas"
import { dbClient } from "@/shared/lib/db"
import { userRepository } from "@/entities/user/_repositories/user"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Не корректные данные!" }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await userRepository.getUsByEmail(email)

  if (existingUser) {
    return { error: "Указанный почтовый адрес уже используется!" }
  }

  await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
  })

  //TODO: Send verification token email

  return { success: "Пользователь создан!" }
}
