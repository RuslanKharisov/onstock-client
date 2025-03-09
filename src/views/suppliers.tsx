"use client"
import { PaginatedSuppliersList } from "@/entities/supplier/_domain/types"
import { AdressCard } from "@/widgets/address-card"

function SupplierList({
  suppliersData,
}: {
  suppliersData: PaginatedSuppliersList
}) {
  if (!suppliersData) return null

  const supplierList = suppliersData.data

  return (
    <section className="mt-10 bg-white dark:bg-gray-900 md:mt-0">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16 ">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Список компаний
          </h2>
          <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
            На этой странице отображаются зарегистрировавшиеся компании
          </p>
        </div>
        <div className="mb-6 grid gap-8 md:grid-cols-2 lg:mb-16">
          {supplierList.map((supplier) => (
            <AdressCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { SupplierList }
