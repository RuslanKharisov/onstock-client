import { Supplier } from "@/entities/supplier/_domain/types"

export type StockListDto = {
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
  supplier: Supplier
}