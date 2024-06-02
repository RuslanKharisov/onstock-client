"use server";

import { revalidatePath } from "next/cache";
import { productsRepository } from "./products.repository";

export const createProductAction = async (
  command: addOrUpdateProductCommand,
  revalidatePagePath: string,
) => {
  await productsRepository.addOrUpdateProduct(command);
  revalidatePath(revalidatePagePath);
};


export const deleteStockElementItemAction = async (
  command: DeleteStockElementCommand,
  revalidatePagePath: string,
) => {
    await productsRepository.deleteStockElement(command)
    revalidatePath(revalidatePagePath);
}