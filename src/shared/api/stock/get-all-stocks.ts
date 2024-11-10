import { PaginatedStockList } from '@/entities/stock/_domain/types';
import api from '../api';

export async function getAllStocks(
  params: {page?: number; limit?: number; productId?:number } = {}
): Promise<PaginatedStockList > {
  console.log("🚀 ~ params:", params)
  try {
    const res = await api.get(`/stock`, {
      headers: {
        'Content-Type': 'application/json'
      },
      // params
    });
    console.log("🚀 ~ res.data:", res.data)
      return  res.data
  } catch {
    throw "error"
  }
}