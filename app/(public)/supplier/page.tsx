import { getAllSuppliers } from "@/entities/supplier/api/get-all-suppliers"
import { Role } from "@/entities/user/_domain/types"
import { auth } from "@/entities/user/auth"
import { SupplierList } from "@/views/suppliers"

type SearchParams = {
  filter_search?: string
  page?: string
  perPage?: string
}

export default async function SuppliersPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const searchQuery = searchParams?.filter_search || ""
  const page = Number(searchParams?.page) || 1
  const perPage = Number(searchParams?.perPage) || 10

  const data = await getAllSuppliers({ page, perPage, searchQuery })
  return <SupplierList suppliersData={data} />
}
