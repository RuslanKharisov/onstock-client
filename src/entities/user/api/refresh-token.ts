import { apiClient } from "@/shared/api/base"
import { JWT } from "next-auth/jwt"

export interface IrefreshToken {
  backendTokens: {
    accessToken: string
    refreshToken: string
  }
}

export const refreshToken = async (token: JWT): Promise<IrefreshToken> => {
  const body = { token: token }
  const res = await apiClient.post<IrefreshToken>(
    `/auth/refresh`,
    body,
    token.backendTokens.refreshToken,
    "Refresh",
  )

  return {
    ...token,
    backendTokens: {
      accessToken: res.backendTokens.accessToken,
      refreshToken: res.backendTokens.refreshToken,
    },
  }
}
