import { MetaData } from "@/shared/api/model/types";
import { StockListElementWithRelations } from "../_domain/types";

export type PaginatedStockListDto = {
  data: StockListElementWithRelations[];
  meta: MetaData
}