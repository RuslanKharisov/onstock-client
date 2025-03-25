import { apiClient } from "@/shared/api/base";
import { Supplier } from "../_domain/types";


export const getSupplier = async (
  userId: string,
  accessToken: string,
): Promise<Supplier | null> => {
  try {
    const res: Supplier = await apiClient.post(`supplier/user/${userId}`, {}, accessToken, 'Bearer');
    return res as Supplier
  } catch {
    return null
  }
};