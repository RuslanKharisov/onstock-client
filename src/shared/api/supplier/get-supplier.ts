import axios from 'axios';
import api from '../api';

export async function getSupplier(
  id: string ,
  accessToken: string
): Promise<Supplier> {
  try {
    const res = await api.get(`/supplier/${id}`, {
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
        return null;
      }
    }
    console.error("getSupplier Unexpected error:", error.code);
    return null;
  }
}