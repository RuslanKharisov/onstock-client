import { UserEntity } from '@/entities/user/types/types';
import axios from 'axios';

export async function getUserByEmail(
  email?: string | null ,
): Promise<UserEntity | null> {
  console.log("🚀 ~ email:", email)
  try {
    const res = await axios.post(`http://localhost:5000/user/profile`, { 'email': email }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
      return  res.data
  } catch(error) {
    console.error("error getting userById", error)
    }
    return null
}

