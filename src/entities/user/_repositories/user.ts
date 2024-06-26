import { dbClient } from "@/shared/lib/db"
import { CreateUserCommand, UserEntity, UserId } from "../_domain/types"

export class UserRepository {
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

  async getUsByEmail(email: string) {
    try {
      return dbClient.user.findUnique({
        where: { email },
      })
    } catch {
      return null
    }
  }

  async createUser(user:CreateUserCommand): Promise<UserEntity> {
    return await dbClient.user.create({
      data: user,
    })
  }
}

export const userRepository = new UserRepository()
