import { apiClient } from "@/shared/api/base";


export const getSupplier = async (
  userId: string,
  accessToken: string,
):Promise<Supplier> => {
  return await apiClient.post(`/supplier/${userId}`,{}, accessToken);
};