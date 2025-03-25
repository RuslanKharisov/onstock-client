import { TPersonalStockDto } from "./personal-stock.dto";

export type TPersonalPaginatedStockDto = {
  data: TPersonalStockDto[];
  meta: MetaData
}