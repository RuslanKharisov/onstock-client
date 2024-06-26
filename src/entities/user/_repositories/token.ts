import { dbClient } from "@/shared/lib/db"
import { VerificationToken } from "../_domain/types"

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await dbClient.verificationToken.findUnique({
      where: { token },
    })
  } catch {
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await dbClient.verificationToken.findFirst({
      where: { email },
    })
    return verificationToken
  } catch {
    return null
  }
}
