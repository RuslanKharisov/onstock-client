import { RegisterSchema } from '@/entities/user/_domain/schemas';
import { z } from 'zod';
import axios from 'axios';

export const registerUserAPI = async (
  data: z.infer<typeof RegisterSchema>
) => {  
  try {
    const res = await axios.post(`http://localhost:5000/auth/register`, data);
    if (res.data.success) {
      return  res.data.success 
    } else {
      return  res.data.error ;
    }    
  } catch (error) {
    throw error
  }
};