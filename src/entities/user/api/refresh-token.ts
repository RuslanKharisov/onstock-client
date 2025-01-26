"use server"

import { apiClient } from "@/shared/api/base"
import { JWT } from "next-auth/jwt"
import { signOut } from "next-auth/react"

export interface IrefreshToken {
  backendTokens: {
    accessToken: string
    refreshToken: string
  }
}

export const refreshToken = async (
  token: JWT,
): Promise<IrefreshToken | undefined> => {
  const body = { token: token }
  try {
    const response = await apiClient.post<IrefreshToken>(
      `auth/refresh`,
      body,
      token.backendTokens.refreshToken,
      "Refresh",
    )

    return {
      ...token,
      backendTokens: {
        accessToken: response.backendTokens.accessToken,
        refreshToken: response.backendTokens.refreshToken,
      },
    }
  } catch (error) {
    console.error("Token refresh error:", error)
    await signOut()
    return undefined
  }
}
