import { apiClient } from "@/shared/api/base"

export interface IemailVerify {
  success?: string
  error?: string
}

export const emailVerify = async (
  token: string
):Promise<IemailVerify> => {
  return await apiClient.post(`/auth/verify-email`, token)
}

