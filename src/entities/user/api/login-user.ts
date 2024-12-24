import { apiClient } from "@/shared/api/base"
import { EmailLoginDto } from "../dto/login-register.dto"

export interface IEmailLoginUser {
  success?: string
  error?: string
  user: {
    id: string
    name: string
    email: string
    picture: string
    role: string
  }
  backendTokens: {
    accessToken: string
    refreshToken: string
  }
}

export const loginUser = async (
  data: EmailLoginDto,
): Promise<IEmailLoginUser> => {
  const body = { ...data }
  return await apiClient.post(`/auth/login`, body)
}
