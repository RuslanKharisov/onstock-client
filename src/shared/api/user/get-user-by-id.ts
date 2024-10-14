import axios from 'axios';
import { User } from 'next-auth';

export async function getUserById(
  id: string,
  accessToken: string
): Promise<User | string> {  
  console.log("🚀 getUserById~ accessToken:", accessToken)
  console.log("🚀 getUserById~ id:", id)
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
        return 'Unauthorized';
      }
    }
    console.error("Unexpected error:", error);
    throw error;
  }
}

