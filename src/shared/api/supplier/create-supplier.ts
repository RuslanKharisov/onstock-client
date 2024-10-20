import { ProfileSchema } from "@/entities/user/_domain/schemas";
import axios from "axios";
import { z } from "zod";


export async function createSupplier (
  id: string | undefined,
  accessToken: string,
  values: z.infer<typeof ProfileSchema>,
) {
  try {
    const res = await axios.post(`http://localhost:5000/supplier`, values, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data
  } catch (error) {
    throw error
  }
}