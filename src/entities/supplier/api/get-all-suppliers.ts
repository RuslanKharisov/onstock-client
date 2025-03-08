import { apiClient } from "@/shared/api/base";
import { Supplier } from "../_domain/types";
import { MetaData } from "@/shared/api/model/types";


type PaginatedSuppliersList = {
  data: Supplier[];
  meta: MetaData
}

interface searchQueryDto {
  page: number
  perPage: number
  searchQuery?: string
}


export const getAllSuppliers = async (
  data: searchQueryDto,
): Promise<PaginatedSuppliersList> => {
  const body = {
    page: data.page,
    perPage: data.perPage,
    searchQuery: data.searchQuery
  }
  return await apiClient.post(`supplier`, body);
};