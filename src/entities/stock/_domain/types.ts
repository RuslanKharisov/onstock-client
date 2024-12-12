import { ColumnFiltersState } from "@tanstack/react-table"

export type Stock = {
  id: string
  sku: string
  name?: string
  description: string
  quantity: number
  supplier: string
  email: string
  siteUrl: string | null
}

export type StockListElementWithRelations = {
  id: string
  supplierId: number
  productId: string
  quantity: number
  product: {
    id: string
    sku: string
    name: string
    description: string
  }
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
  data: StockListElementWithRelations[];
  totalCount: number;
  limit: number;
  skip: number;
  currentPage: number;
  totalPages: number;
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
  filters?: ColumnFiltersState
}
