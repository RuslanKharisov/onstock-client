import { Product } from "@/entities/producrts-list/_domain/types"

export type Stock = {
  id: string
  sku: string
  name?: string
  description: string
  quantity: number
  supplier: string
  supplierId: number
  email: string
  siteUrl: string | null
  newDeliveryQty1: number
  newDeliveryDate1: Date
  newDeliveryQty2: number
  newDeliveryDate2: Date
  manufacturer: string
}

export type StockListElementWithRelations = {
  id: string
  supplierId: number
  productId: string
  quantity: number
  newDeliveryQty1: number
  newDeliveryDate1: Date
  newDeliveryQty2: number
  newDeliveryDate2: Date
  product: Product
  supplier: getSupplier
}

type getSupplier = {
  id: number
  name: string
  email: string
  siteUrl: string | null
  userId: string
  tariffId: number
}

// Тип для ответа с пагинацией
export type PaginatedStockList = {
  data: StockListElementWithRelations[]
  totalCount: number
  limit: number
  skip: number
  currentPage: number
  totalPages: number
}

// заготовка для склада
export type CreateStockElementCommand = {
  quantity: number
  supplierId: number // для connect к id поставщика
  productId: string // для coonnect к id продукта, если он уже есть в базе
}

export interface stockQueryDto {
  page: number
  perPage: number
  searchQuery?: string
}
