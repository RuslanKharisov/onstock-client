import { StockListElementWithRelations } from "../_domain/types";

export type PaginatedStockListDto = {
  data: StockListElementWithRelations[];
  meta: MetaData
}