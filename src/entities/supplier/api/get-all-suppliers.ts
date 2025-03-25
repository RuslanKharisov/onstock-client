import { apiClient } from "@/shared/api/base";
import { Supplier } from "../_domain/types";
import { MetaData } from "@/shared/api/model/types";
import { Filters } from "@/shared/types";


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
  const params = new URLSearchParams();

  // Добавляем параметры запроса
  params.append('page', data.page.toString());
  params.append('perPage', data.perPage.toString());

  // Добавляем фильтры, если они есть
  if (data.filters) {
    Object.entries(data.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(`filters[${key}]`, value.toString());
      }
    });
  }
  return await apiClient.get(`supplier/list?${params.toString()}`);
};