import { apiClient } from "@/shared/api/base"
import { UserEntity } from "../types/types"


export const getUserById = async (
  userId: string,
  accessToken: string,
): Promise<UserEntity> => {
  const body = {}
  return await apiClient.post(`user/${userId}`, 
    body,
    accessToken,
    "Bearer",
  )
}