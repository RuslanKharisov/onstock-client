import { apiClient } from "@/shared/api/base"
import { ChangeSupplierDto } from "../dto"

export const ConnectSupplierApi = async ({ url, token, accessToken }:
  {
    url: string,
    token: string,
    accessToken: string,
  }
) => {

  const body = {
    url: url,
    token: token
  }
  return await apiClient.post(`supplier/connectapi`, body, accessToken)
}
