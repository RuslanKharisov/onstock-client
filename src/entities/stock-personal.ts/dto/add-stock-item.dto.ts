export type addOrUpdateProductDto = {
  sku: string
  name: string
  description: string
  quantity: number | string
  email?: string
}