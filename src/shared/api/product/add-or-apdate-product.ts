"use server"
import { revalidatePath } from "next/cache";
import api from "../api";
import axios from "axios";

export async function addOrUpdateProduct (
  accessToken: string,
  data: addOrUpdateProductCommand,
  // revalidatePagePath: string,
  ) {
  try {
    const res = await axios.post(`http://localhost:5000/product-management`, data, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    // revalidatePath(revalidatePagePath)
    return res.data
  } catch (error) {
    throw error
  }
}