"use client"

import { useEffect, useState } from "react"
import { ProductsTableColumns } from "@/entities/stock/_vm/_products-table-columns"
import { DataTable, usePagination } from "@/widgets/smart-data-table"
import { useRouter, useSearchParams } from "next/navigation"
import { TextFilterInput } from "@/shared/ui/text-filter-input"
import { SearchParams } from "app/(private)/personal-stock/page"

function AllStocks({
  dataArray,
  count,
  searchQuery,
}: {
  dataArray: any[]
  count: number
  searchQuery: SearchParams
}) {
  const { onPaginationChange, pagination } = usePagination()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Фильтры
  const [filters, setFilters] = useState({
    sku: searchQuery.sku || "", // Получаем из URL при загрузке
    description: searchQuery.description || "",
  })

  // Функция обновления URL при изменении параметров поиска
  const updateUrlParams = (
    pagination?: {
      pageIndex: number
      pageSize: number
    },
    resetPage = false,
  ) => {
    const params = new URLSearchParams(searchParams.toString())

    if (filters.sku) {
      params.set("sku", filters.sku)
    } else {
      params.delete("sku")
    }

    if (filters.description) {
      params.set("description", filters.description)
    } else {
      params.delete("description")
    }

    if (resetPage) {
      params.set("page", "1")
    } else if (pagination) {
      params.set("page", (pagination.pageIndex + 1).toString())
      params.set("perPage", pagination.pageSize.toString())
    }

    router.push(`?${params.toString()}`)
  }

  // useEffect для обновления URL при изменении пагинации
  useEffect(() => {
    updateUrlParams(pagination)
  }, [pagination]) // Обновляем URL при смене страницы

  // Функция для обновления значений фильтров
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Применение фильтров при нажатии кнопки
  const applyFilter = () => {
    updateUrlParams(undefined, true)
  }

  return (
    <div className="container px-3 py-1 pt-20 md:pt-5">
      <h1 className="mb-8 text-center">
        Онлайн каталог оборудования промышленной автоматизации
      </h1>
      <div className="flex flex-col gap-4  md:flex-row">
        <TextFilterInput
          value={filters.sku}
          onChange={(e) => handleFilterChange("sku", e.target.value)}
          applyFilter={applyFilter}
          placeholder="Искать по артикулу..."
        />
        <TextFilterInput
          value={filters.description}
          onChange={(e) => handleFilterChange("description", e.target.value)}
          applyFilter={applyFilter}
          placeholder="Искать по описанию..."
        />
      </div>
      <DataTable
        columns={ProductsTableColumns}
        data={dataArray}
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
