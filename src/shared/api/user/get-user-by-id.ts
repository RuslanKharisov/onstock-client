import { UserEntity } from '@/entities/user/types/types';
import axios from 'axios';

export async function getUserById(
  id: string,
  accessToken: string
): Promise<UserEntity> {
  try {
    const res = await axios.get(`http://localhost:5000/user/${id}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
      return  res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 401 && data.message === 'Unauthorized') {
        console.warn('Unauthorized access. Returning null user.');
      }
    }
    console.error("Unexpected error:", error);
    throw error;
  }
}

