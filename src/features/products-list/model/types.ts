type ProductListElement = {
  id: string;
  sku: string;
  name: string;
  description: string;
};

type addOrUpdateProductCommand = {
  sku: string;
  name: string;
  description: string;
  quantity: number;
  supplierId: number;
  email: string;
};

type CreateProductListElementCommand = {
  sku: string;
  name: string;
  description: string;
};

type DeleteProductListElementCommand = {
  id: string;
};

type StockElement = {
  id?: number;
  supplierId: number;
  productId: string;
  quantity: number;
};

// заготовка для склада
type CreateStockElementCommand = {
  quantity: number;
  supplierId: number; // для connect к id поставщика
  productId: string; // для coonnect к id продукта, если он уже есть в базе
};
