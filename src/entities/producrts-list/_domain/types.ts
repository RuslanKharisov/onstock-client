export type ProductListElement = {
  id: string
  sku: string
  name: string
  description: string
}

export type CreateProductListElementCommand = {
  sku: string
  name: string
  description: string
}

export type DeleteProductListElementCommand = {
  id: string
}

export type addOrUpdateProductCommand = {
  sku: string
  name: string
  description: string
  quantity: number | string
  // supplierId: number 
  email?: string
}
