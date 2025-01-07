export type addOrUpdateProductDto = {
  sku: string
  category?: string
  name: string
  description: string
  quantity: number | string
  manufacturer?: string
  newDeliveryQty1?: number
  newDeliveryDate1?: Date
  newDeliveryQty2?: number
  newDeliveryDate2?: Date
}
