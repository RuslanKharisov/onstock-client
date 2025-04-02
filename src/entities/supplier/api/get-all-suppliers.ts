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

  try {
    return await apiClient.post(`supplier/list`, body);
  } catch (error) {
    console.log("error ==> ", error);
    return {
      data: [],
      meta: {
        total: 1,
        page: 1,
        currentPage: 1,
        lastPage: 1,
        next: null,
        prev: null,
      }
    }
  }
};