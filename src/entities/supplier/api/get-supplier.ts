import { apiClient } from "@/shared/api/base";

export const getSupplier = async (
  userId: string,
  accessToken: string,
): Promise<Supplier> => {
  const res: Supplier = await apiClient.post(`supplier/user/${userId}`, {}, accessToken, 'Bearer');
  return res as Supplier
}