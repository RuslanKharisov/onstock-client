export type Supplier = {
  id: number
  name: string
  email: string
  siteUrl: string | null
  userId: string
  subscriptions: Subscription[]
} | null

type Subscription = {
  id: number
  supplierId: number
  tariffId: number
  startDate: Date
  endDate: Date
  tariff: Tariff
}

type Tariff = {
  id: number
  name: string
  maxProducts: number
  pricePerUnit: number
}
