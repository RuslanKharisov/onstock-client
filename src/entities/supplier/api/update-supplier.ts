import { apiClient } from "@/shared/api/base"
import { ChangeSupplierDto } from "../dto"

export const updateSupplier = async (
  userId: string,
  accessToken: string,
  data: ChangeSupplierDto,
) => {
  const body = { ...data }
  return await apiClient.patch(`supplier`, body, accessToken)
}
