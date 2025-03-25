import { GetSupplierList } from "@/entities/supplier/api/get-all-suppliers"
import { SupplierList } from "@/views/suppliers"

export default async function SuppliersPage() {
  const SuppliersListQuery = {
    page: 1,
    perPage: 10,
    filters: { name: "" },
  }

  const data = await GetSupplierList(SuppliersListQuery)
  return <SupplierList suppliersData={data} />
}
