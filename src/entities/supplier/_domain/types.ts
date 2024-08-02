type Supplier = {
  id: number
  name: string
  email: string
  siteUrl: string | null
  userId: string
} | null

type CreateSupplierCmd = {
  name: string
  email: string
  siteUrl: string | null
}