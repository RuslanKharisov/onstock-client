
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array";
import { DataTable } from "./_ui/DataTable";
import { Columns } from "./model/columns";
import { ColumnsPrivate } from "./model/columns-private";

export function SmartDataTable({
  variant,
  stockList
}: {
  stockList: StockListElementWithRelations[];
  variant: "auth" | "private" | "public"
}) {
  const isProfile = variant === "private";

  const stockArray: Stock[] = convertToStockArray(stockList);

  return (
    <DataTable
    columns={isProfile ? ColumnsPrivate : Columns}
    data={stockArray}/>
  )
}