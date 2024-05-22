"use server";

import { revalidatePath } from "next/cache";
import { productsRepository } from "./products.repository";

export const createProductAction = async (
//   command: CreateProductListElementCommand,
  command: addOrUpdateProductCommand,
  revalidatePagePath: string,
) => {
    
    console.log("🚀 ~ command:", command)
    
//   await productsRepository.createProductElement(command);
  await productsRepository.addOrUpdateProduct(command);
  revalidatePath(revalidatePagePath);
};