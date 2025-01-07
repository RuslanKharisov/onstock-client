import { Manufacturer } from "@/entities/manufacturer/_domain/types"

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
  category?:string
  name: string
  description: string
  quantity: number | string
  manufacturer?:string
  newdelivery_qty_1?: number | string
  newdelivery_qty_2?: number | string
  newdelivery_date_1?: string
  newdelivery_date_2?: string
}

export type Product = {
  id: string;
  sku: string;
  name: string;
  description: string;
  categoryId: number;
  manufacturerId: number;
  manufacturer: Manufacturer;
}