"use client"

import { useGetPersonalStock } from "@/entities/stock-personal.ts/api/personal-stock.queries"
import { useGetSupplier } from "@/entities/supplier/api/supplier.queries"
import { getAvalibleStockLimits } from "@/shared/lib/get-avalible-stock-limit"
import { StockList } from "@/widgets/stock"
import { ApdateStock, StockSettings } from "@/widgets/update-stock/update-stock"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

function PersonalStock() {
  const { data: session } = useSession()
  const [stockSettings, setStockSettings] = useState<StockSettings | null>(null)

  const userId = session?.user.id
  const accessToken = session?.backendTokens.accessToken

  const { data: supplier } = useGetSupplier(userId ?? "", accessToken ?? "")

  // получаем склад полользователя
  const { data: existingStock } = useGetPersonalStock({
    userId: userId ?? "",
    accessToken: accessToken ?? "",
    page: 1,
    perPage: 5,
    filters: undefined,
  })

  useEffect(() => {
    if (supplier && existingStock) {
      const stockSettings = getAvalibleStockLimits({
        supplier,
        stockLenght: existingStock.meta.total,
      })
      setStockSettings(stockSettings ?? null)
    }
  }, [supplier, existingStock]) // Следим за изменениями

  if (!session) return <h3>...Loading</h3>

  return (
    <div className="container mx-auto px-5 pt-16 md:pt-8 lg:px-6">
      {/* to do вынести инфо о тарифе в отдельный компонент */}
      <div>
        <p className="text-center text-sm ">
          Активный тариф:{" "}
          <span>{supplier?.subscription.tariff.maxProducts}</span>{" "}
        </p>
        <p className="text-center text-sm ">
          Лимит склада по тарифу: <span>{stockSettings?.tariffLimit}</span>{" "}
        </p>
        <p className="text-center text-sm ">
          Доступно: <span>{stockSettings?.freeSpace}</span>{" "}
        </p>
      </div>

      {userId && accessToken && (
        <>
          <ApdateStock
            accessToken={accessToken}
            userId={userId}
            stockSettings={stockSettings}
          />

          <StockList userId={userId} accessToken={accessToken} />
        </>
      )}
    </div>
  )
}

export default PersonalStock
