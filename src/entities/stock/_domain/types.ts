type Stock = {
  id: string
  sku: string
  name?: string
  description: string
  quantity: number
  supplier: string
  email: string
  siteUrl: string
}

type StockListElementWithRelations = {
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

type DeleteStockElementCommand = {
  id: string
}

// заготовка для склада
type CreateStockElementCommand = {
  quantity: number
  supplierId: number // для connect к id поставщика
  productId: string // для coonnect к id продукта, если он уже есть в базе
}

type getSupplier = {
  id: number
  name: string
  email: string
  siteUrl: string
  userId: string
}
