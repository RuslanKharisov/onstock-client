import { StockTableColumns } from "@/entities/stock/_vm/_stocks-table-columns"
import { auth } from "@/entities/user/auth"
import UpdateSupplier from "@/features/update-supplier/update-supplier-form"
import { getStockById } from "@/shared/api/stock"
import { getSupplier } from "@/shared/api/supplier"
import { ButtonWrapper } from "@/shared/lib/button-wrapper"
import { useUserStore } from "@/shared/store/userStore"
import { Button } from "@/shared/ui/button"
import { SmartDataTable } from "@/widgets/smart-data-table/smart-data-table"
import { ApdateStock } from "@/widgets/update-stock/update-stock"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

async function PersonalStock({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return null

  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken
  const supplier = await getSupplier(userId, accessToken)

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

  const stockProducts = await getStockById(userId, accessToken)

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6 lg:py-16">
      <div className="mb-8">
        <h1 className="">Склад: {supplier?.name} </h1>
        <p className="text-sm font-semibold">
          Текущий тариф:
          <span className="ms-2">
            {supplier.supplierTariff.name}
          </span>
          <span>
            <Button size="sm" variant="link">
              <Link
                className="font-bold uppercase text-secondary"
                href={`/profile`}
              >
                Изменить
              </Link>
            </Button>
          </span>
        </p>
        <p className="text-sm font-semibold">
          Максимальное количество по текущему тарифу:
          <span className="ms-2">
            {supplier.supplierTariff.maxProducts}
          </span>
        </p>
        <p className="text-sm font-semibold">Позиций на складе:
          <span className="ms-2">{stockProducts?.length}</span>
        </p>
      </div>
      <section className="mb-8">
        {supplier && (
          <ApdateStock
            supplier={supplier}
            session={session}
            revalidatePagePath="/personal-stock/"
          />
        )}
      </section>
      <section className="">
      {stockProducts && <SmartDataTable
          stockList={stockProducts}
          columns={StockTableColumns}
          variant="private"
        />}
      </section>
    </main>
  )
}


export default PersonalStock
