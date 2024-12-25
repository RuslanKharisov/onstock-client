import { apiClient } from "@/shared/api/base"
import { UserEntity } from "../types/types"
import { UpdateUserDto } from "../dto/update-user.dto"

export const updateUser = async (
  data: UpdateUserDto,
  accessToken: string,
): Promise<UserEntity> => {
  const body = { ...data }
  return await apiClient.patch(`/user`, body, accessToken)
}
