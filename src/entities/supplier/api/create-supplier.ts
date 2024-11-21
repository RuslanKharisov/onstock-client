import { apiClient } from "@/shared/api/base";
import { ChangeSupplierDto } from "../dto";


export const createSupplier = async (
  userId: string,
  accessToken: string,
  values: ChangeSupplierDto,
) => {
  const body = {...values}
  return await apiClient.post(`/supplier`, body, accessToken);
};