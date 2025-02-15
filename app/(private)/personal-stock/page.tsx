import { getPersonalStock } from "@/entities/stock-personal.ts/api/get-personal-stock"
import { getSupplier } from "@/entities/supplier/api/get-supplier"
import { auth } from "@/entities/user/auth"
import { StockList } from "@/widgets/stock"
import { ApdateStock } from "@/widgets/update-stock/update-stock"

async function PersonalStock() {
  const session = await auth()
  if (!session) return null

  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken

  const supplier = await getSupplier(userId, accessToken)
  const tariffName = supplier?.subscriptions?.[0].tariff.name
  const tariffLimit = supplier?.subscriptions?.[0].tariff.maxProducts

  // получаем склад полользователя
  const existingStock = await getPersonalStock({
    userId: userId,
    accessToken: accessToken,
    page: 1,
    perPage: 5,
    filters: undefined,
  })

  return (
    <div className="container mx-auto px-5 pt-16 md:pt-8 lg:px-6">
      {/* to do вынести инфо о тарифе в отдельный компонент */}
      <div>
        <h3 className="mb-2 text-center text-lg font-bold">{supplier?.name}</h3>
        <p className="text-center text-sm ">
          Активный тариф: <span>{tariffName}</span>{" "}
        </p>
        <p className="text-center text-sm ">
          Лимит склада по тарифу: <span>{tariffLimit}</span>{" "}
        </p>
      </div>

      <ApdateStock accessToken={accessToken} userId={userId} />

      <StockList userId={userId} accessToken={accessToken} />
    </div>
  )
}

export default PersonalStock
