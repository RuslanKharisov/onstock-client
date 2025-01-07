export type Supplier = {
  id: number
  name: string
  email: string
  siteUrl: string | null
  userId: string
  supplierTariff: supplierTariff
} | null

type supplierTariff = {
  id: 1, name: string
  maxProducts: number
  pricePerUnit: number 
}