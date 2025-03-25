import { apiClient } from "@/shared/api/base";


export const getSupplierInfo = async (
  supplierId: number,
): Promise<Supplier | null> => {
  try {
    const res: Supplier = await apiClient.get(`supplier/${supplierId}`);
    return res as Supplier
  } catch {
    return null
  }
};