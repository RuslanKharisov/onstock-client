import { Metadata } from "next"
import { GetSupplierList } from "@/entities/supplier/api/get-all-suppliers"
import { getStocksGoogle } from "@/entities/stock/api/get-stocks-google"
import { GoogleStock } from "@/widgets/stock/ui/google-stock"
import { StockSearchBar } from "@/widgets/stock/ui/stock-search-bar"
import { AdressCard } from "@/widgets/address-card"
import { Spinner } from "@/shared/ui/spinner"

export type SearchParams = {
  sku: string
  description: string
  page?: string
  perPage?: string
}

export const metadata: Metadata = {
  title: "Онлайн склад | Prom-Stock",
  description: "Онлайн каталог оборудования промышленной автоматизации...",
}

export default async function StockPageTest({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const filters = {
    sku: searchParams.sku || "",
    description: searchParams.description || "",
    category: "",
  }

  const pagination = {
    page: searchParams.page || "1",
    perPage: searchParams.perPage || "10",
  }

  const suppliersData = await GetSupplierList({
    page: 1,
    perPage: 100,
    filters: { name: "" },
  })

  // Формируем запросы
  const requests = suppliersData.data.map(async (supplier) => {
    console.log("supplier ==> ", supplier)
    const searchQuery = JSON.stringify(filters)
    console.log("supplier.api.url ==> ", supplier.api.url)
    const url = `${supplier.api.url}/exec?token=${supplier.api.token}&page=${pagination.page}&per_page=${pagination.perPage}&filters=${searchQuery}`

    try {
      const response = await getStocksGoogle(url)
      return {
        supplier,
        data: response.data,
        meta: response.meta,
      }
    } catch (err) {
      console.error(`Ошибка при запросе к ${supplier.name}:`, err)
      return null
    }
  })

  // Дождаться всех результатов (асинхронный параллельный вызов)
  const results = await Promise.allSettled(requests)

  // Сортируем по скорости ответа (fulfilled первыми)
  const validResults = results
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => (r as PromiseFulfilledResult<any>).value)

  if (!validResults.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container flex flex-col gap-12 pt-8">
      <StockSearchBar />

      {validResults.map(({ supplier, data, meta }) => (
        <div key={supplier.name} className="supplier-block">
          <div className="supplier-header">
            <AdressCard key={supplier.id} supplier={supplier} />
            {/* <h3 className="text-lg font-semibold">{supplier.name}</h3> */}
            <a
              className="text-sm text-blue-500"
              href={`tel:${supplier.contact}`}
            >
              {supplier.contact}
            </a>
          </div>
          <GoogleStock dataArray={data} count={meta.total} />
        </div>
      ))}
    </div>
  )
}
