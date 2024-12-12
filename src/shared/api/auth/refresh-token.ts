import axios from 'axios';
import { JWT } from "next-auth/jwt";


export async function refreshTokenApi(token:JWT) {
  try {
    const res = await axios.post(`http://localhost:5000/auth/refresh`, {}, {
      headers: {
        Authorization: `Refresh ${token.backendTokens.refreshToken}`,
        'Content-Type': 'application/json'
      }
    });
      return {
        ...token,
        backendTokens: res.data,
      }  
  } catch (error) {
    console.error("refreshTokenApi error:")
    throw error
  }
}
