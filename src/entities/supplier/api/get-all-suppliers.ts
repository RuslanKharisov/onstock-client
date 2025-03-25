import { apiClient } from "@/shared/api/base";

type PaginatedSuppliersList = {
  data: Supplier[];
  meta: MetaData
}

interface SuppliersListQueryDto {
  page: number
  perPage: number
  filters?: Filters
}


export const GetSupplierList = async (
  data: SuppliersListQueryDto,
): Promise<PaginatedSuppliersList> => {
  const body = {
    page: data.page,
    perPage: data.perPage,
    filters: data.filters
  }
  return await apiClient.post(`supplier/list`, body);
};