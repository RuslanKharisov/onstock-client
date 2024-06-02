
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

  const convertToStockArray = (stockList: StockListElementWithRelations[]): Stock[] => {
    return stockList.map(stockItem => ({
      id: stockItem.id,
      sku: stockItem.product.sku,
      name: stockItem.product.name,
      description: stockItem.product.description,
      quantity: stockItem.quantity,
      supplier: stockItem.supplier.name
    }));
  };
  const stockArray: Stock[] = convertToStockArray(stockList);

  return (
    <DataTable
    columns={isProfile ? ColumnsPrivate : Columns}
    data={stockArray}/>
  )
}