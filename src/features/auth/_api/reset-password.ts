import { apiClient } from "@/shared/api/base"
import { ResetPasswordDto } from "../dto/reset-password.dto"

export interface ResetPasswordResponse {
  success?: string
  error?: string
}

export const resetPassword = async (
  data: ResetPasswordDto,
): Promise<ResetPasswordResponse> => {
  const body = { ...data }
  return await apiClient.post(`/auth/reset-password`, body)
}
