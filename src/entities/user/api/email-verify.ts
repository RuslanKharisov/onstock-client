import { apiClient } from "@/shared/api/base"

export interface IemailVerify {
  success?: string
  error?: string
}

export const emailVerify = async (
  token: string
):Promise<IemailVerify> => {
  const body = {token: token}
  return await apiClient.post(`/auth/verify-email`, body)
}

