import { getStrapiURL } from "@/shared/lib/utils";
import { Product } from "./_domain/types";
import { getAuthToken } from "../user/get-auth-status";

const baseUrl = getStrapiURL();

export async function createProductService(product:Product) {
  console.log("🚀 ~ createProductService ~ product:", product)
  const url = `${baseUrl}/api/products`;
  console.log("🚀 ~ createProductService ~ url:", url)

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({data:{...product}}),
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error( error);
  }
}