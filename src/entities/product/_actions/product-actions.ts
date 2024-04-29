"use server";

import { Product } from "../_domain/types";
import { createProductService } from "../strapi-product-service";

/* Экшн формы загрузки файла с товарами */
export async function createProductsAction(products: Product) {
  console.log("🚀 ~ createProductsAction ~ products:", products);

  const responseData = await createProductService(products);

  if (!responseData) {
    return {
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      strapiErrors: responseData.error,
      message: "Failed to Register.",
    };
  }
}
