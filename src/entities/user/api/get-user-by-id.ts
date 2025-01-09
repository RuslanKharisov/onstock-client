import { apiClient } from "@/shared/api/base"
import { UserEntity } from "../types/types"

interface UserResponse {
  user?: UserEntity | null; // Поле с пользователем
  error?: string; // Поле с сообщением об ошибке
}

export const getUserById = async (
  userId: string,
  accessToken: string,
): Promise<UserEntity | null> => {
  const body = {}
  try {
    const res: UserResponse = await apiClient.post(
      `user/${userId}`,
      body,
      accessToken,
      "Bearer",
    )

    // Проверка на ошибки
    if (res.error) {
      throw new Error(res.error)
    }
    
    return res as UserEntity; // Приведение типа к UserEntity
  } catch (error) {
    console.error(error); // Логирование ошибки
    return null;
  }
}
