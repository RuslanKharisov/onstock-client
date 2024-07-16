import { v4 as uuidv4 } from "uuid"
import crypto from "crypto"
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

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString() 
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

  const existingToken = await tokenRepository.getTwoFactorTokenByEmail(email)

  if (existingToken) {
    await tokenRepository.deleteTwoFactorToken(existingToken.id)
  }

  const twoFatorToken = await dbClient.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
  return twoFatorToken
}
