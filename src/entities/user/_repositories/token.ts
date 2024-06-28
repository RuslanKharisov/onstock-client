import { dbClient } from "@/shared/lib/db"
import { VerificationToken } from "../_domain/types"

class TokenRepository {

  async deleteVerificationToken (existingToken:VerificationToken) {
    await dbClient.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

   async getVerificationTokenByToken (token: string) {
    try {
      const verificationToken = await dbClient.verificationToken.findUnique({
        where: { token },
      })
      return verificationToken
    } catch {
      return null
    }
  }
  
   async getVerificationTokenByEmail  (email: string): Promise<VerificationToken | null> {
    try {
      const verificationToken = await dbClient.verificationToken.findFirst({
        where: { email },
      })
      return verificationToken
    } catch {
      return null
    }
  }

}

export const tokenRepository = new TokenRepository()






