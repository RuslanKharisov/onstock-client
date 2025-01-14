"use server"

import { signIn } from "@/entities/user/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/shared/lib/routes"
import { AuthError } from "next-auth"
import { getSession } from "next-auth/react"

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
      
    })

    if (!result) {
      await getSession()
    }
    
  } catch (error) {
    if (error instanceof AuthError) {
      return "log in failed"
    }
    throw error
  }
}
