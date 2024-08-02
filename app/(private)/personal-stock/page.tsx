import { StockTableColumns } from "@/entities/stock/_vm/_stocks-table-columns"
import { getAppSessionServer } from "@/entities/user/session.server"
import { productsRepository } from "@/features/products-list/products.repository"
import UpdateSupplier from "@/features/update-supplier/update-supplier-form"
import { ButtonWrapper } from "@/shared/lib/button-wrapper"
import { Button } from "@/shared/ui/button"
import { SmartDataTable } from "@/widgets/smart-data-table/smart-data-table"
import { ApdateStock } from "@/widgets/update-stock/update-stock"
import { useEffect } from "react"

export default async function PersonalStock({
  params,
}: {
  params: { id: string }
}) {
  const session = await getAppSessionServer()
  const sessionId = session?.user.id

  if (!sessionId) return null

  const supplier = await productsRepository.getSupplierId(sessionId)
  const stockProducts = await productsRepository.getStockListById(sessionId)

  if (!supplier)
    return (
      <main className="container flex h-screen flex-col items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
        <h1 className=" mb-8 text-center">
          Осталось внести данные компании поставщика
        </h1>
        <div className="mb-8 ">
          <ButtonWrapper routeUrl={"/profile"}>
            <Button size="lg">Указать данные компании</Button>
          </ButtonWrapper>
        </div>
      </main>
    )

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6 lg:py-16">
      <h1 className=" mb-8 text-center ">Склад: {supplier?.name} </h1>
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
