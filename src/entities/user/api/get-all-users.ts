import { apiClient } from "@/shared/api/base"
import { getAllUsersDto } from "../dto/get-all-users.dto";
import { UsersListElementWithRelations } from "../_domain/types";

export type PaginatedUsersListDto = {
  data: UsersListElementWithRelations[];
  meta: MetaData
}

export const getAllUsers = async (
  { accessToken, data }: {
    accessToken: string,
    data: getAllUsersDto
  }
): Promise<PaginatedUsersListDto> => {
  const body = data
  return await apiClient.post(
    `user`,
    body,
    accessToken,
    'Bearer'
  )

}
