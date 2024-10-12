import { LoginSchema } from '@/entities/user/_domain/schemas';
import axios from 'axios';
import { z } from 'zod';

export const loginUserAPI = async (
  data: z.infer<typeof LoginSchema>
) => {  
  try {
    const res = await axios.post(`http://localhost:5000/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
      return  res.data
  } catch (error) {
    console.error("🚀 ~ error:", error)
    throw error
  }
};