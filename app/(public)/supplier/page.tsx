import { GetSupplierList } from "@/entities/supplier/api/get-all-suppliers"
import { SupplierList } from "@/views/suppliers"

export const dynamic = "force-dynamic" // Добавьте эту строку

export default async function SuppliersPage() {
  const SuppliersListQuery = {
    page: 1,
    perPage: 10,
    filters: { name: "" },
  }

  try {
    const data = await GetSupplierList(SuppliersListQuery)
    return <SupplierList suppliersData={data} />
  } catch (error) {
    console.error("Failed to fetch suppliers:", error)
    return <div>Error loading suppliers</div>
  }
}
