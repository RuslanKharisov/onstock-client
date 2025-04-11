import { GetSupplierList } from "@/entities/supplier/api/get-all-suppliers"
import { SupplierList } from "@/views/suppliers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Поставщики | Prom-Stock",
  description:
    "Список компаний поставщиков оборудования промышленной автоматизации.",
}

export default async function SuppliersPage() {
  const SuppliersListQuery = {
    page: 1,
    perPage: 10,
    filters: { name: "" },
  }

  const data = await GetSupplierList(SuppliersListQuery)

  if (!data)
    return (
      <div className="container flex h-full flex-col items-center justify-center">
        <h1>Что то пошло не так</h1>
      </div>
    )

  return <SupplierList suppliersData={data} />
}
