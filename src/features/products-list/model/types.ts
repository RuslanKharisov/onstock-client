type ProductListElement = {
  id: string;
  sku: string;
  name: string;
  description: string;
};

type getSupplier = {
  id: number;
  name:   string;
  email:  string;
  userId: string;
};

type StockListElementWithRelations = {
  id?: number;
  supplierId: number;
  productId: string;
  quantity: number;
  product: {
    id: string;
    sku: string;
    name: string;
    description: string;
  };
  supplier: { id: number; name: string; email: string };
};

type addOrUpdateProductCommand = {
  sku: string;
  name: string;
  description: string;
  quantity: number | string;
  supplierId?: number | string;
  email?: string;
};

type CreateProductListElementCommand = {
  sku: string;
  name: string;
  description: string;
};

type DeleteProductListElementCommand = {
  id: string;
};

type DeleteStockItemCommand = {
  id: number;
};

// заготовка для склада
type CreateStockElementCommand = {
  quantity: number;
  supplierId: number; // для connect к id поставщика
  productId: string; // для coonnect к id продукта, если он уже есть в базе
};
