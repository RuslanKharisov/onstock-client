"use client"

import { useEffect, useMemo, useState } from "react"
import { StockTableColumns } from "@/entities/stock-personal.ts/_vm/_stocks-table-columns"
import { useRemovePersonalStockElement } from "@/entities/stock-personal.ts/api/personal-stock.queries"
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array"
import { DataTable, usePagination } from "@/widgets/smart-data-table"
import { useRouter, useSearchParams } from "next/navigation"
import { TextFilterInput } from "@/shared/ui/text-filter-input"
import { useGetSupplier } from "@/entities/supplier/api/supplier.queries"
import { ApdateStock } from "@/widgets/update-stock/update-stock"
import { TPersonalPaginatedStockDto } from "@/entities/stock-personal.ts/dto"
import { SearchParams } from "app/(private)/personal-stock/page"

function PrivatelStock({
  personalStock,
  userId,
  accessToken,
  updateStock,
  searchQuery,
}: {
  personalStock: TPersonalPaginatedStockDto
  userId: string
  accessToken: string
  updateStock: () => Promise<void>
  searchQuery: SearchParams
}): JSX.Element {
  const { onPaginationChange, pagination } = usePagination()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Фильтры
  const [filters, setFilters] = useState({
    sku: searchQuery.sku || "", // Получаем из URL при загрузке
    description: searchQuery.description || "",
  })

  const { data: supplier } = useGetSupplier(userId, accessToken)

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

  // Удаление элемента
  const { mutate: removeStockElement } =
    useRemovePersonalStockElement(accessToken)
  const handleDelete = async (id: string) => {
    removeStockElement(id)
    await updateStock()
  }

  // Форматируем данные для таблицы
  const stockArray = useMemo(
    () => convertToStockArray(personalStock.data),
    [personalStock.data],
  )

  return (
    <>
      <div>
        <p className="text-center text-sm ">
          Активный тариф:{" "}
          <span>{supplier?.subscription.tariff.maxProducts}</span>{" "}
        </p>
      </div>

      <ApdateStock
        accessToken={accessToken}
        userId={userId}
        updateStock={updateStock}
      />

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
        columns={StockTableColumns}
        data={stockArray}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
        rowCount={personalStock.meta.total}
        manualPagination={true}
        handleDelete={handleDelete}
      />
    </>
  )
}

export { PrivatelStock }
