import { apiClient } from "@/shared/api/base"
import { PaginatedStockListDto } from "../dto/stock-with-pagination.dto"



export const getStocksGoogle = async (
  url: string,
): Promise<PaginatedStockListDto> => {


  try {
    return await apiClient.get<PaginatedStockListDto>(url)

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