import { apiClient } from "@/shared/api/base";
import { CreateSupplierDto } from "../dto/create-supplier.dto";


export const createSupplier = async (
  userId: string,
  accessToken: string,
  values: CreateSupplierDto,
) => {
  const body = { ...values }
  return await apiClient.post(`supplier`, body, accessToken, 'Bearer');
};