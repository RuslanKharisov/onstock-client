import { ProfileSchema } from "@/entities/user/_domain/schemas";
import axios from "axios";
import { access } from "fs";
import { User } from "next-auth";
import { z } from "zod";

export async function updateUser (
  id: string | undefined,
  accessToken: string | undefined,
  values: z.infer<typeof ProfileSchema>
) {
  try {
    const res = await axios.patch(`${process.env.API_URL}/user/${id}`, values, {
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