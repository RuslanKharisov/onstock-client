import { apiClient } from "@/shared/api/base"
import { PaginatedStockListDto } from "../dto/stock-with-pagination.dto"
import { stockQueryDto } from "../_domain/types"

export const getStocks = async (
  data: stockQueryDto,
): Promise<PaginatedStockListDto> => {

  const body = {
    page: data.page,
    perPage: data.perPage,
    filters: data.filters
  }


  try {
    return await apiClient.post<PaginatedStockListDto>("stock/list", body)

  } catch (error) {
    console.error("error ==> ", error);
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
}