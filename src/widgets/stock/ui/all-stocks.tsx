"use client"

import { useEffect } from "react"
import { ProductsTableColumns } from "@/entities/stock/_vm/_products-table-columns"
import { DataTable, usePagination } from "@/widgets/smart-data-table"
import { useRouter, useSearchParams } from "next/navigation"
import { TextFilterInput } from "@/shared/ui/text-filter-input"

function AllStocks({
  stockArray,
  count,
  searchQuery,
}: {
  stockArray: any[]
  count: number
  searchQuery: string
}) {
  const { onPaginationChange, pagination } = usePagination()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Функция обновления URL при изменении пагинации
  const updateUrlParams = (pagination: {
    pageIndex: number
    pageSize: number
  }) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", (pagination.pageIndex + 1).toString()) // pageIndex начинается с 0
    params.set("perPage", pagination.pageSize.toString())
    router.push(`?${params.toString()}`)
  }

  // useEffect для отслеживания изменений пагинации
  useEffect(() => {
    updateUrlParams(pagination)
  }, [pagination]) // Срабатывает при изменении pagination

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value
    const params = new URLSearchParams(searchParams.toString())

    if (newSearchQuery) {
      params.set("filter_search", newSearchQuery)
    } else {
      params.delete("filter_search")
    }
    params.set("page", "1") // При поиске сбрасываем на первую страницу
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="container px-3 py-1 pt-20 md:pt-5">
      <TextFilterInput
        value={searchQuery}
        onChange={handleSearchChange}
        applyFilter={() => {}} // не задействован
        placeholder="Искать по артикулу или описанию ..."
      />
      <DataTable
        columns={ProductsTableColumns}
        data={stockArray}
        rowCount={count}
        manualPagination={true}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        loading={false}
        handleDelete={() => {}} // не задействован
      />
    </div>
  )
}

export { AllStocks }
