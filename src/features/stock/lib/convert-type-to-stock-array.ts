export const convertToStockArray = (stockList: StockListElementWithRelations[]): Stock[] => {

  return stockList.map(stockItem => ({
    id: stockItem.id,
    sku: stockItem.product.sku,
    name: stockItem.product.name,
    description: stockItem.product.description,
    quantity: stockItem.quantity,
    supplier: stockItem.supplier.name,
    email: stockItem.supplier.email,
    siteUrl: stockItem.supplier.siteUrl

  }));
};