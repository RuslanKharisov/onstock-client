"use server"
import { jwtVerify } from 'jose';

export async function verifyToken(accessToken: string): Promise<{valid:boolean}> {
  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(accessToken, secret);
    console.log("Token is valid:", payload);
    return {valid:true};
    } catch (error) {
    return {valid: false}
  }
}
