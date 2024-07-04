import { v4 as uuidv4 } from "uuid"
import { dbClient } from "../../../shared/lib/db"
import { tokenRepository } from "../_repositories/token"

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3 * 3600 * 1000)

  const existingToken = await tokenRepository.getVerificationTokenByEmail(email)

  if (existingToken) {
    await dbClient.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const verificationToken = await dbClient.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3 * 3600 * 1000)

  const existingToken =
    await tokenRepository.getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await dbClient.passwordResetToken.delete({
      where: { id: existingToken.id },
    })
  }

  const passwordResetToken = await dbClient.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return passwordResetToken
}
