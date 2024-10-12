"use server"

import * as z from "zod"
import { signIn } from "@/entities/user/auth"
import { LoginSchema } from "@/entities/user/_domain/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/shared/lib/routes"
import { AuthError } from "next-auth"
import { revalidatePath } from "next/cache"


export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    return { success: "Вход выполнен!" , res }
    revalidatePath(DEFAULT_LOGIN_REDIRECT)
    
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
