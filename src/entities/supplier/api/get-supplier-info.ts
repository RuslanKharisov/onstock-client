import { apiClient } from "@/shared/api/base";
import { Supplier } from "../_domain/types";


export const getSupplierInfo = async (
  supplierId: number,
):Promise<Supplier | null> => {
  try {
    const res:Supplier = await apiClient.get(`supplier/${supplierId}`);
    return res as Supplier
  } catch {
    return null
  }
};