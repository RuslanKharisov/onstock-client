export type addOrUpdateProductDto = {
  sku: string
  name: string
  category: string | undefined
  description: string
  quantity: string | number
  manufacturer: string | undefined
  newDeliveryQty1: number | undefined
  newDeliveryDate1: Date | undefined
  newDeliveryQty2: number | undefined
  newDeliveryDate2: Date | undefined
}
