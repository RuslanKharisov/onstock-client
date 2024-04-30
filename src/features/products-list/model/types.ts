type ProductListElement = {
    id: string;
    sku: string;
    name: string;
    description: string;
  };
  
  type CreateProductListElementCommand = {
    sku: string;
    name: string;
    description: string;
  };
  
  type DeleteProductListElementCommand = {
    id: string;
  };