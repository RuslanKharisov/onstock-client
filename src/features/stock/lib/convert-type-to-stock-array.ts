import { Stock, StockListElementWithRelations } from "@/entities/stock/_domain/types";

export const 
convertToStockArray = (stockList: StockListElementWithRelations[]): Stock[] => {

  return stockList.map(stockItem => ({
    id: stockItem.id,
    sku: stockItem.product.sku,
    name: stockItem.product.name,
    description: stockItem.product.description,
    quantity: stockItem.quantity,
    supplier: stockItem.supplier.name,
    supplierId: stockItem.supplier.id,
    email: stockItem.supplier.email,
    siteUrl: stockItem.supplier.siteUrl,
    newDeliveryQty1: stockItem.newDeliveryQty1,
    newDeliveryDate1: stockItem.newDeliveryDate1,
    newDeliveryQty2: stockItem.newDeliveryQty2,
    newDeliveryDate2: stockItem.newDeliveryDate2,
    manufacturer: stockItem.product.manufacturer?.name,
  }));
};