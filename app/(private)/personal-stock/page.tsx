import { StockTableColumns } from "@/entities/stock/_vm/_stocks-table-columns"
import { getAppSessionServer } from "@/entities/user/session.server"
import { productsRepository } from "@/features/products-list/products.repository"
import { SmartDataTable } from "@/widgets/smart-data-table/smart-data-table"
import { ApdateStock } from "@/widgets/update-stock/update-stock"
import { string } from "zod"

export default async function PersonalStock({
  params,
}: {
  params: { id: string }
}) {
  const session = await getAppSessionServer()
  const sessionId = session?.user.id

  if (!sessionId) return null

  const supplier = await productsRepository.getSupplierId(sessionId)
  console.log("🚀 ~ supplier:", supplier)
  const stockProducts = await productsRepository.getStockListById(sessionId)

  if (!supplier)
    return (
      <main className="container mx-auto py-10">
        <h1 className=" mb-8 text-center text-3xl">Здесь отображаются тавары вашего склада </h1>
        <section className="mb-8">
          <p>Получить статус постащика для управления складом</p>
        </section>
        <section className="">
          <SmartDataTable
            stockList={stockProducts}
            columns={StockTableColumns}
            variant="private"
          />
        </section>
      </main>
    )

  return (
    <main className="container mx-auto py-10">
      <h1 className=" mb-8 text-center text-3xl">Склад: {supplier?.name} </h1>
      <section className="mb-8">
        {supplier && (
          <ApdateStock
            supplier={supplier}
            revalidatePagePath="/personal-stock/"
          />
        )}
      </section>
      <section className="">
        <SmartDataTable
          stockList={stockProducts}
          columns={StockTableColumns}
          variant="private"
        />
      </section>
    </main>
  )
}
