import { productsRepository } from "@/features/products-list/products.repository";
import { DataTable } from "./_ui/layout";
    
    
    export async function StockTable() {
    const stockList = await productsRepository.getStockList();
    console.log("🚀 ~ StockTable ~ stockList:", stockList)

    return (
        <DataTable data={stockList}/>
    );
}