import { LoginSchema } from '@/entities/user/_domain/schemas';
import axios from 'axios';
import { z } from 'zod';
import { JWT } from "next-auth/jwt";
import { Session } from 'next-auth';


export async function refreshTokenApi(token:JWT) {
  try {
    const res = await axios.post(`http://localhost:5000/auth/refresh`, {}, {
      headers: {
        Authorization: `Refresh ${token.backendTokens.refreshToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("🚀 ~ refreshTokenApi ~ res:", res)
      return {
        ...token,
        backendTokens: res.data,
      }  
  } catch (error) {
    console.error("refreshTokenApi error:")
    throw error
  }
};
