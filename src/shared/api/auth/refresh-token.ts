import { LoginSchema } from '@/entities/user/_domain/schemas';
import axios from 'axios';
import { z } from 'zod';
import { JWT } from "next-auth/jwt";

// async function refreshToken(token: JWT): Promise<JWT> {
//   const res = await fetch(Backend_URL + "/auth/refresh", {
//     method: "POST",
//     headers: {
//       authorization: `Refresh ${token.backendTokens.refreshToken}`,
//     },
//   });
//   console.log("refreshed");

//   const response = await res.json();

//   return {
//     ...token,
//     backendTokens: response,
//   };
// }



export async function refreshTokenApi(token: string): Promise<JWT> {  
  try {
    const res = await axios.post(`http://localhost:5000/auth/refresh`, token, {
      headers: {
        authorization: `Refresh ${token}`,
      }
    });
    // console.log("🚀 ~ refreshTokenApi res:", res.data)
      return  res.data
  } catch (error) {
    console.error("🚀 ~ error:", error)
    throw error
  }
};