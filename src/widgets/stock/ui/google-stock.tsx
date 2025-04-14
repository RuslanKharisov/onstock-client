"use client"

import { useEffect, useTransition, useState } from "react"
import { DataTable, usePagination } from "@/widgets/smart-data-table"
import { useRouter, useSearchParams } from "next/navigation"
import { ProductsTableColumns } from "@/entities/stock/_vm/_products-table-columns"
import { Spinner } from "@/shared/ui/spinner"

function GoogleStock({
  dataArray,
  count,
}: {
  dataArray: any[]
  count: number
}): JSX.Element {
  const { onPaginationChange, pagination } = usePagination()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    setShowSpinner(true)

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("page", (pagination.pageIndex + 1).toString())
      params.set("perPage", pagination.pageSize.toString())
      router.push(`?${params.toString()}`)
    })
  }, [pagination])

  // Убираем спиннер чуть позже, чтобы не мигал
  useEffect(() => {
    if (!isPending) {
      const timer = setTimeout(() => setShowSpinner(false), 400)
      return () => clearTimeout(timer)
    }
  }, [isPending])

  return (
    <div className="relative">
      {showSpinner && (
        <div className="absolute top-8 z-10 ">
          <Spinner />
        </div>
      )}
      <DataTable
        columns={ProductsTableColumns}
        data={dataArray}
        onPaginationChange={onPaginationChange}
        pagination={pagination}
        rowCount={count}
        manualPagination={true}
        handleDelete={() => {}}
      />
    </div>
  )
}

export { GoogleStock }
