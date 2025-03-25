export type addOrUpdateProductDto = {
  sku: string;
  name: string;
  description?: string | null;
  quantity: number;
  category?: string;
  manufacturer?: string;
  newDeliveryQty1?: number;
  newDeliveryDate1?: Date;
  newDeliveryQty2?: number;
  newDeliveryDate2?: Date;
}
