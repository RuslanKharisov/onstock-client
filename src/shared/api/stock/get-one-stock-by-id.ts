import api from '../api';

export async function getStockById(
  id: string ,
  accessToken: string
): Promise<StockListElementWithRelations[]> {
  try {
    const res = await api.get(`/stock/${id}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
      return  res.data
  } catch (error) {
    throw error;
  }
}