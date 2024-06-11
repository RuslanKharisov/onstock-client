"use server"

import * as z from "zod"
import { LoginSchema } from "@/entities/user/_domain/schemas"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Не корректные данные!" }
  }

  return { success: "Успешно!" }
}
