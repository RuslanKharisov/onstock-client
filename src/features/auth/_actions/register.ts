"use server"

import * as z from "zod"
import { RegisterSchema } from "@/entities/user/_domain/schemas"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Не корректные данные!" }
  }

  return { success: "Успешно!" }
}
