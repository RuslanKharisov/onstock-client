import { dbClient } from "@/shared/lib/db"
import { PasswordResetToken, VerificationToken } from "../_domain/types"

class TokenRepository {
  /**
   * Асинхронно удаляет токен верификации из базы данных.
   *
   * @param existingToken - объект токена верификации, который необходимо удалить.
   *
   * Пример использования:
   * ```
   * const token = await getVerificationTokenByEmail('user@example.com');
   * await deleteVerificationToken(token);
   * ```
   */
  async deleteVerificationToken(existingToken: VerificationToken) {
    await dbClient.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  /**
   * Асинхронно извлекает уникальный токен верификации из базы данных по значению токена.
   *
   * @param token - строка, представляющая токен, который нужно найти.
   * @returns {Promise<VerificationToken | null>} Возвращает объект токена верификации или null, если токен не найден.
   *
   * Пример использования:
   * ```
   * const verificationToken = await getVerificationTokenByToken('12345');
   * ```
   */
  async getVerificationTokenByToken(token: string) {
    try {
      const verificationToken = await dbClient.verificationToken.findUnique({
        where: { token },
      })
      return verificationToken
    } catch {
      return null
    }
  }

  /**
   * Асинхронно извлекает токен верификации из базы данных по адресу электронной почты.
   *
   * @param email - строка, представляющая электронную почту, связанную с токеном, который нужно найти.
   * @returns {Promise<VerificationToken | null>} Возвращает объект токена верификации или null, если токен не найден.
   *
   * Пример использования:
   * ```
   * const verificationToken = await getVerificationTokenByEmail('user@example.com');
   * ```
   */
  async getVerificationTokenByEmail(
    email: string,
  ): Promise<VerificationToken | null> {
    try {
      const verificationToken = await dbClient.verificationToken.findFirst({
        where: { email },
      })
      return verificationToken
    } catch {
      return null
    }
  }

  /**
   * Асинхронно извлекает уникальный токен сброса пароля из базы данных по значению токена.
   *
   * @param token - строка, представляющая токен, который нужно найти.
   * @returns {Promise<PasswordResetToken | null>} Возвращает объект токена верификации или null, если токен не найден.
   *
   * Пример использования:
   * ```
   * const passwordResetToken = await getPasswordResetTokenByToken('sometoken');
   * ```
   */
  async getPasswordResetTokenByToken(
    token: string,
  ): Promise<PasswordResetToken | null> {
    try {
      const passwordResetToken = await dbClient.passwordResetToken.findUnique({
        where: { token },
      })
      return passwordResetToken
    } catch {
      return null
    }
  }

  /**
   * Асинхронно извлекает уникальный токен сброса пароля из базы данных по переданному Email.
   *
   * @param token - строка, представляющая токен, который нужно найти.
   * @returns {Promise<PasswordResetToken | null>} Возвращает объект токена верификации или null, если токен не найден.
   *
   * Пример использования:
   * ```
   * const passwordResetToken = await getPasswordResetTokenByEmailToken('someEmail');
   * ```
   */
  async getPasswordResetTokenByEmail(
    email: string,
  ): Promise<PasswordResetToken | null> {
    try {
      const passwordResetToken = await dbClient.passwordResetToken.findFirst({
        where: { email },
      })
      return passwordResetToken
    } catch {
      return null
    }
  }

  async deletePasswordResetToken(existingToken: PasswordResetToken) {
    await dbClient.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  async getTwoFactorTokenByToken(token: string) {
    try {
      const twoFactorToken = await dbClient.twoFactorToken.findUnique({
        where: { token },
      })
      return twoFactorToken
    } catch {
      return null
    }
  }

  async getTwoFactorTokenByEmail(email: string) {
    try {
      const twoFactorToken = await dbClient.twoFactorToken.findFirst({
        where: { email },
      })
      return twoFactorToken
    } catch {
      return null
    }
  }

  async deleteTwoFactorToken(id: string) {
    dbClient.twoFactorToken.delete({
      where: { id: id },
    })
  }

  async createTwoFactorConfirmationByUserId(userId:string) {
    await dbClient.twoFactorConfirmation.create({
      data: {
        userId: userId,
      },
    })
  }

  async getTwoFactorConfirmationByUserId(userId: string) {
    try {
      const twoFactorConfirmation =
        await dbClient.twoFactorConfirmation.findUnique({
          where: { userId },
        })
      return twoFactorConfirmation
    } catch {
      return null
    }
  }

  async deleteTwoFactorConfirmation(id: string) {
    where: {
      id: id
    }
  }
}

export const tokenRepository = new TokenRepository()
