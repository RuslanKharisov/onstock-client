"use server"
import { jwtVerify } from "jose"

export async function verifyToken(
  accessToken: string,
): Promise<{ valid: boolean }> {
  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
    const { payload } = await jwtVerify(accessToken, secret)
    if (payload) {
      return { valid: true }
    } else {
      return { valid: false }
    }
  } catch {
    return { valid: false }
  }
}
