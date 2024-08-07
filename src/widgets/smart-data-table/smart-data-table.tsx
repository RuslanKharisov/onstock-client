
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array";
import { DataTable } from "./_ui/DataTable";
import { StockTableColumns } from "@/entities/stock/_vm/_stocks-table-columns";
import { ProductsTableColumns } from "@/entities/producrts-list/_vm/_products-table-columns";
import { ColumnDef } from "@tanstack/react-table";

export function SmartDataTable({
  stockList,
  columns,
  variant,
}: {
  stockList: StockListElementWithRelations[];
  columns: ColumnDef<Stock>[]
  variant: "auth" | "private" | "public"
}) {
  const isProfile = variant === "private";

  const stockArray: Stock[] = convertToStockArray(stockList);

  return (
    <DataTable
    // columns={isProfile ? StockTableColumns : ProductsTableColumns}
    columns={columns}
    data={stockArray}/>
  )
}