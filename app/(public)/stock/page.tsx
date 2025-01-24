"use client";

import { useEffect, useState, useMemo } from "react";
import { ProductsTableColumns } from "@/entities/stock/_vm/_products-table-columns";
import { useGetStocks } from "@/entities/stock/api/stock.queries";
import { convertToStockArray } from "@/features/stock/lib/convert-type-to-stock-array";
import { DataTable, usePagination } from "@/widgets/smart-data-table";
import { useSearchParams, useRouter } from "next/navigation";
import { TextFilterInput } from "@/widgets/smart-data-table/_ui/text-filter-input";

export default function StockPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [stocks, setStocks] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [searchQueryDraft, setSearchQueryDraft] = useState<string>(""); // Для чернового ввода
  const [searchQuery, setSearchQuery] = useState<string>(""); // Для подтвержденного фильтра

  // Хуки для пагинации и сортировки
  const { onPaginationChange, pagination } = usePagination();

  const { data, isPending } = useGetStocks({
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
    searchQuery, // передаем фильтр как query параметр
  });

  useEffect(() => {
    if (data) {
      setStocks(data.data);
      setCount(data.meta.total);
    }
  }, [data]);

  const handleSearchChange = (newSearchQuery: string) => {
    setSearchQueryDraft(newSearchQuery); // Обновляем черновой фильтр
  };

  const applyFilters = () => {
    setSearchQuery(searchQueryDraft); // Подтверждаем фильтр
    const params = new URLSearchParams(searchParams.toString());
    if (searchQueryDraft) {
      params.set("filter_search", searchQueryDraft);
    } else {
      params.delete("filter_search");
    }
    router.push(`?${params.toString()}`);
    onPaginationChange({ pageIndex: 0, pageSize: pagination.pageSize });
  };

  const stockArray = useMemo(() => convertToStockArray(stocks), [stocks]);
  const handleDelete = () => null;

  return (
    <div className="container py-1 px-3 pt-20 md:pt-5">
      <TextFilterInput
        value={searchQueryDraft} // Отображаем черновик
        onChange={(e) => handleSearchChange(e.target.value)} // Обновляем черновик
        applyFilter={applyFilters} // Применяем фильтр
        placeholder="Искать по артикулу или описанию ..."
      />
      <DataTable
        columns={ProductsTableColumns}
        data={stockArray}
        loading={isPending}
        rowCount={count}
        handleDelete={handleDelete}
        manualPagination={true}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
    </div>
  );
}
