import type { MetadataRoute } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

const ITEMS_PER_PAGE = 10;

async function fetchStockMeta() {
  try {
    const res = await fetch(`${API_URL}/stock/meta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filters: {} }), // Пустые фильтры для общего количества
      next: { revalidate: 86400 }, // Кеш 24 часа
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const { lastPage } = await res.json();
    console.log("lastPage ==> ", lastPage);
    return lastPage;
  } catch (error) {
    console.error('Fetch error:', error);
    return { total: 0 }; // Fallback
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { totalPages } = await fetchStockMeta();

  const baseUrls = [
    {
      url: 'https://prom-stock.ru/',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: 'https://prom-stock.ru/stock',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  const paginatedUrls = Array.from({ length: totalPages }, (_, i) => ({
    url: `https://prom-stock.ru/stock?page=${i + 1}&perPage=${ITEMS_PER_PAGE}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: i === 0 ? 0.7 : 0.5,
  }));

  return [...baseUrls, ...paginatedUrls];
}