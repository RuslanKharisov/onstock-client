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