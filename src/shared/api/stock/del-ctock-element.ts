"use server"
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function deleteStockElement(
  id: string ,
  accessToken: string,
) {
  try {
    const res = await axios.delete(`http://localhost:5000/stock/${id}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    revalidatePath("/")
  } catch (error) {
    throw error;
  }
}