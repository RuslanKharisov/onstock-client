import { Product } from "@/entities/producrts-list/_domain/types"
import { Supplier } from "@/entities/supplier/_domain/types"

export type StockListDto = {
  id: string
  supplierId: number
  productId: string
  quantity: number
  newDeliveryQty1: number
  newDeliveryDate1: Date
  newDeliveryQty2: number
  newDeliveryDate2: Date
  product: Product
  supplier: Supplier
}