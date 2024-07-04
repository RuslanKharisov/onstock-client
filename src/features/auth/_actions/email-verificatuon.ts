"use server"

import { tokenRepository } from "@/entities/user/_repositories/token"
import { userRepository } from "@/entities/user/_repositories/user"

export const newVerification = async (token: string) => {
  const existingToken = await tokenRepository.getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: "Token does not exist" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: "Token has expired!" }
  }

  const existingUser = await userRepository.getUsByEmail(existingToken.email)

  if (!existingUser) {
    return { error: "Email does not exist!" }
  }

  await userRepository.updateUserEmail(existingUser, existingToken)
  await tokenRepository.deleteVerificationToken(existingToken)

  return { success : "Email verified!" }
}
