import api from '../api';

export async function getAllStocks(
): Promise<StockListElementWithRelations[] | null> {
  try {
    const res = await api.get(`/stock`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
      return  res.data
  } catch (error) {
    return null
  }
}