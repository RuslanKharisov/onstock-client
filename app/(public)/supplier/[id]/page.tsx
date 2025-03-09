"use client"

import { useGetSupplierInfo } from "@/entities/supplier/api/supplier.queries"
import { AdressCard } from "@/widgets/address-card"

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

  return (
    <>
      <section className="mt-10 bg-white py-8 antialiased dark:bg-gray-900 md:py-8 md:pt-0">
        <div className="container px-4 2xl:px-0">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">
            Подробнее о компании: &#34;{supplier.name}&#34;
          </h2>
          <AdressCard supplier={supplier} />
        </div>
      </section>
    </>
  )
}
