import { GetSupplierList } from "@/entities/supplier/api/get-all-suppliers"
import { SupplierList } from "@/views/suppliers"

export const dynamic = "force-dynamic"

export default async function SuppliersPage() {
  const SuppliersListQuery = {
    page: 1,
    perPage: 10,
    filters: { name: "" },
  }

  try {
    const data = await GetSupplierList(SuppliersListQuery)
    return <SupplierList suppliersData={data} />
  } catch {
    return (
      <SupplierList
        suppliersData={{
          data: [],
          meta: {
            total: 0,
            currentPage: 1,
            page: 10,
            lastPage: 1,
            next: null,
            prev: null,
          },
        }}
      />
    )
  }
}
