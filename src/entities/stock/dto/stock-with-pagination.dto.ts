import { MetaData } from "@/shared/api/model/types";
import { StockListDto } from "./stock-list.dto";

export type PaginatedStockListDto = {
  data: StockListDto[];
  meta: MetaData
}