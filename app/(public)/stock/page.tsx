import { getStocks } from "@/entities/stock/api/get-stocks"
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array"
import { StockListElementWithRelations } from "@/entities/stock/_domain/types"
import { AllStocks } from "@/widgets/stock"

type SearchParams = {
  filter_search?: string
  page?: string
  perPage?: string
}

export default async function StockPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const searchQuery = searchParams?.filter_search || ""
  const page = Number(searchParams?.page) || 1
  const perPage = Number(searchParams?.perPage) || 10

  const data = await getStocks({ page, perPage, searchQuery })
  console.log("data ==> ", data.data)
  const stockArray = convertToStockArray(
    data.data as StockListElementWithRelations[],
  )
  const count = data.meta.total

  return (
    <AllStocks dataArray={stockArray} count={count} searchQuery={searchQuery} />
  )
}
