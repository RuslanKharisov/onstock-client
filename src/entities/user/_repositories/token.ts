import { dbClient } from "@/shared/lib/db"
import { VerificationToken } from "../_domain/types"

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
}

export const tokenRepository = new TokenRepository()
