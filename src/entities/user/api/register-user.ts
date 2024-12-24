import { apiClient } from "@/shared/api/base"
import { NewPasswordDto } from "../dto/new-password.dto"

export interface registerUser {
  success?: string
  error?: string
}

export const registerUser = async (
  data: NewPasswordDto
):Promise<registerUser> => {
  const body = { ...data }
  return await apiClient.post(`/auth/new-password`, body)
}

