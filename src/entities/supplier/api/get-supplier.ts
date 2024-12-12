import { apiClient } from "@/shared/api/base";
import { Supplier } from "../_domain/types";


export const getSupplier = async (
  userId: string,
  accessToken: string,
):Promise<Supplier> => {
  return await apiClient.post(`/supplier/${userId}`,{}, accessToken);
};