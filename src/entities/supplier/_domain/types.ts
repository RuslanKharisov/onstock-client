export type Supplier = {
  id: number
  name: string
  email: string
  siteUrl: string | null
  userId: string
  subscription: Subscription
  phoneWork?: string
  phoneMobile?: string
  telegramAccount?: string
  whatsappNumber?: string
  vkProfile?: string
  country?: string
  city?: string
  street?: string
  houseNumber?: string
  logoUrl?: string
}

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
