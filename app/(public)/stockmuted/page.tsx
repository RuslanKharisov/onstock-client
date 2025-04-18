import { getStocks } from "@/entities/stock/api/get-stocks"
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array"
import { StockListElementWithRelations } from "@/entities/stock/_domain/types"
import { AllStocks } from "@/widgets/stock"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Онлайн склад | Prom-Stock",
  description:
    "Онлайн каталог оборудования промышленной автоматизации. Поиск по складу. Контроллеры. КИПиА. Блоки питания. Автоматические выключатели. Частотные преобразователи.",
}

type SearchParams = {
  sku: string
  description: string
  page?: string
  perPage?: string
}

export default async function StockPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const searchQuery = searchParams || ""
  const page = Number(searchParams?.page) || 1
  const perPage = Number(searchParams?.perPage) || 10

  const data = await getStocks({
    page,
    perPage,
    filters: {
      sku: searchParams?.sku,
      description: searchParams?.description,
    },
  })

  const stockArray = convertToStockArray(
    data.data as StockListElementWithRelations[],
  )
  const count = data.meta.total

  return (
    <AllStocks dataArray={stockArray} count={count} searchQuery={searchQuery} />
  )
}
