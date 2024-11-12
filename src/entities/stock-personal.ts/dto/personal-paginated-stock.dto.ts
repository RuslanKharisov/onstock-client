import { MetaData } from "@/shared/api/model/types";
import { TPersonalStockDto } from "./personal-stock.dto";

export type TPersonalPaginatedStockDto = {
  data: TPersonalStockDto[];
  meta: MetaData
}