import { ProductsTableColumns } from "@/entities/producrts-list/_vm/_products-table-columns"
// import { productsRepository } from "@/features/products-list/products.repository"
import { SmartDataTable } from "@/widgets/smart-data-table/smart-data-table"

export default async function Stock() {
  // const stockProducts = await productsRepository.getStockList()
  const stockProducts = null

  if (!stockProducts) {
    return (
      <main className="flex flex-col justify-center items-center ">
        <h1>Продукты не загружены</h1>
      </main>
    )
  }

  return (
    <main className="container py-8">
      <h1 className="text-center">Промышленный склад России онлайн</h1>
      <SmartDataTable
        stockList={stockProducts}
        columns={ProductsTableColumns}
        variant="public"
      />
    </main>
  )
}
