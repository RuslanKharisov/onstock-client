type ProductListElement = {
    id: string;
    name: string;
    description: string;
  };
  
  type CreateProductListElementCommand = {
    name: string;
    description: string;
  };
  
  type DeleteProductListElementCommand = {
    id: string;
  };