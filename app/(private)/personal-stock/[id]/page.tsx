import { productsRepository } from "@/features/products-list/products.repository"
import { SmartDataTable } from "@/widgets/smart-data-table/smart-data-table"
import { ApdateStock } from "@/widgets/update-stock/update-stock"
import { string } from "zod"

export default async function PersonalStock({
  params,
}: {
  params: { id: string }
}) {
  const stockProducts = await productsRepository.getStockListById(params)
  const supplier = await productsRepository.getSupplierId(params)
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
        <SmartDataTable stockList={stockProducts} variant="private" />
      </section>
    </main>
  )
}
