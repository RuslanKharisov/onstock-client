"use client"

import { useGetSupplierInfo } from "@/entities/supplier/api/supplier.queries"
import { AcountOverview } from "@/widgets/acount-overview"

export default function Supplier({ params }: { params: { id: number } }) {
  const supplierId = Number(params.id)

  const { data: supplier, isPending } = useGetSupplierInfo(supplierId)

  if (isPending)
    return (
      <div className="container flex h-full flex-col items-center justify-center">
        <h1>... загружаем данные</h1>
      </div>
    )

  if (!supplier)
    return (
      <div className="container flex h-full flex-col items-center justify-center">
        <h1>Что то пошло не так</h1>
      </div>
    )

  return <AcountOverview supplier={supplier} />
}
