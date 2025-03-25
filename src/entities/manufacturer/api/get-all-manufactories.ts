import { apiClient } from "@/shared/api/base"
import { Manufacturer } from "../_domain/types";
import { ManufactorerListQueryDto } from "../dto/manufactorer-list-query.dto";

type PaginatedManufactorerList = {
  data: Manufacturer[];
  meta: MetaData
}

export const GetManufactorerList = async (
  data: ManufactorerListQueryDto
): Promise<PaginatedManufactorerList> => {

  const body = {
    page: data.page,
    perPage: data.perPage,
    filters: data.filters
  }


  return await apiClient.post<PaginatedManufactorerList>("manufacturer/list", body)
}

