import { apiClient } from "@/shared/api/base"
import { NewPasswordDto } from "../dto/new-password.dto"

export interface NewPasswordResponse {
  success?: string
  error?: string
}

export const newPassword = async (
  data: NewPasswordDto,
  token: string,
): Promise<NewPasswordResponse> => {
  console.log(data)
  const body = { ...data, token }
  return await apiClient.post(`/auth/new-password`, body)
}
