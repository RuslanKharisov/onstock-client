import { StockTableColumns } from "@/entities/stock/_vm/_stocks-table-columns"
import { tariffRepository } from "@/entities/tariff/_repositories/tariff.repository"
import { auth } from "@/entities/user/auth"
import UpdateSupplier from "@/features/update-supplier/update-supplier-form"
import { getSupplierById } from "@/shared/api/supplier"
import { ButtonWrapper } from "@/shared/lib/button-wrapper"
import { useUserStore } from "@/shared/store/userStore"
import { Button } from "@/shared/ui/button"
import { SmartDataTable } from "@/widgets/smart-data-table/smart-data-table"
import { ApdateStock } from "@/widgets/update-stock/update-stock"
import Link from "next/link"

export default async function PersonalStock({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()
  if (!session) return null
  const stockProducts:Stock[] = [];

  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken  
  const supplier = await getSupplierById(userId, accessToken)

  console.log("🚀 ~ stockProducts:", stockProducts.length)
  if (!supplier)
    return (
  <main className="container flex h-screen flex-col items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
        <h1 className=" mb-8 text-center">
          Осталось внести данные компании поставщика
        </h1>
        <div className="mb-8 ">
          <ButtonWrapper routeUrl={`/profile/${userId}`}>
            <Button size="lg">Указать данные компании</Button>
          </ButtonWrapper>
        </div>
      </main>
    )


    
    // const stockProducts = await productsRepository.getStockListById(sessionId)
  // const currentTariff = await tariffRepository.getSupplierTariffById(
  //   supplier.tariffId,
  // )
  // console.log("🚀 ~ currentTariff:", currentTariff)

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6 lg:py-16">
      <div className="text-center mb-8">
        <h1 className="   ">Склад: {supplier?.name} </h1>
        <p className=" font-semibold">
          {" "}
          Текущий тариф:{" "}
          {/* <span className="font-normal">{currentTariff?.name}</span> <span> <Button size="sm" variant="link"><Link className="uppercase text-secondary font-bold" href="/profile">Изменить</Link></Button>  </span> {" "} */}
        </p>
        <p className=" font-semibold">
          {" "}
          Максимальное количество по текущему тарифу:{" "}
          {/* <span className="font-normal">{currentTariff?.maxProducts}</span>{" "} */}
        </p>
        <p className=" font-semibold">
          {" "}
          Товарных позиций на складе:{" "}
          <span className="font-normal">{stockProducts.length}</span>{" "}
        </p>
      </div>
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
