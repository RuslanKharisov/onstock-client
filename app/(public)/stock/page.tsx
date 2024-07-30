import { ProductsTableColumns } from "@/entities/producrts-list/_vm/_products-table-columns"
import { productsRepository } from "@/features/products-list/products.repository"
import { SmartDataTable } from "@/widgets/smart-data-table/smart-data-table"

export default async function Stock() {
  const stockProducts = await productsRepository.getStockList()
  return (
    <main className="container min-h-screen px-8">
      <h1 className=" my-10 text-center text-3xl">Промышленный склад России онлайн</h1>
      <SmartDataTable
        stockList={stockProducts}
        columns={ProductsTableColumns}
        variant="public"
      />
    </main>
  )
}
