import { apiClient } from "@/shared/api/base"
import { UserEntity } from "../types/types"

export const getUserByEmail = async (
  email?: string | null,
): Promise<UserEntity> => {
  const body = { email: email }
  return await apiClient.post(`user/`, body)
}
