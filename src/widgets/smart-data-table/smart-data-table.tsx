
import { DataTable } from "./_ui/DataTable";
import { Stock, columns } from "./model/columns";

export function SmartDataTable ({
    stockList
}:{
    stockList:StockListElementWithRelations[];
}){
    const convertToStockArray = (stockList: StockListElementWithRelations[]):Stock[] => {
        return stockList.map(stockItem => ({
          id: stockItem.product.id,
          sku: stockItem.product.sku,
          name: stockItem.product.name,
          description: stockItem.product.description,
          quantity: stockItem.quantity,
          supplier: stockItem.supplier.name
        }));
      };
      const stockArray:Stock[] = convertToStockArray(stockList);

    return (
             <DataTable columns={columns} data={stockArray} />
    )
}