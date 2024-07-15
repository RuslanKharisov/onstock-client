import { dbClient } from "@/shared/lib/db"
import {
  CreateUserCommand,
  UserEntity,
  UserId,
  VerificationToken,
} from "../_domain/types"

class UserRepository {
  async getAllUsers(): Promise<UserEntity[]> {
    return dbClient.user.findMany()
  }

  async getUserById(userId: UserId): Promise<UserEntity> {
    return dbClient.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    })
  }

  async getUserByEmail(email: string) {
    try {
      return dbClient.user.findUnique({
        where: { email },
      })
    } catch {
      return null
    }
  }

  async createUser(user: CreateUserCommand): Promise<UserEntity> {
    return await dbClient.user.create({
      data: user,
    })
  }

  /**
   * асинхронно обновляет данные пользователя:
   * дату подтверждения почты
   * адрес почты
   * @param user
   * @param existingToken
   */
  async updateUserEmail(
    user: UserEntity,
    existingToken: VerificationToken,
  ): Promise<UserEntity> {
    return dbClient.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    })
  }

  async updateUserPasword(
    user: UserEntity,
    password: string,
  ): Promise<UserEntity> {
    return dbClient.user.update({
      where: { id: user.id },
      data: {
        password: password,
      },
    })
  }
}

export const userRepository = new UserRepository()
