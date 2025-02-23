"use client"

import { ProductsTableColumns } from "@/entities/stock/_vm/_products-table-columns"
import { DataTable, usePagination } from "@/widgets/smart-data-table"
import { useRouter } from "next/navigation"
import { TextFilterInput } from "@/shared/ui/text-filter-input"

function AllStocks({
  stockArray,
  count,
  searchQuery,
}: {
  stockArray: any[]
  count: number
  searchQuery: string
}) {
  const { onPaginationChange, pagination } = usePagination()
  const router = useRouter()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value
    const params = new URLSearchParams(window.location.search)
    if (newSearchQuery) {
      params.set("filter_search", newSearchQuery)
    } else {
      params.delete("filter_search")
    }
    router.push(`?${params.toString()}`)
  }

  const handleDelete = () => null

  return (
    <div className="container px-3 py-1 pt-20 md:pt-5">
      <TextFilterInput
        value={searchQuery}
        onChange={handleSearchChange}
        applyFilter={() => {}}
        placeholder="Искать по артикулу или описанию ..."
      />
      <DataTable
        columns={ProductsTableColumns}
        data={stockArray}
        rowCount={count}
        handleDelete={handleDelete}
        manualPagination={true}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
        loading={false}
      />
    </div>
  )
}
// function AllStocks() {
//   const searchParams = useSearchParams()
//   const router = useRouter()

//   const [stocks, setStocks] = useState<any[]>([])
//   const [count, setCount] = useState(0)
//   const [searchQueryDraft, setSearchQueryDraft] = useState<string>("") // Для чернового ввода
//   const [searchQuery, setSearchQuery] = useState<string>("") // Для подтвержденного фильтра

//   // Хуки для пагинации и сортировки
//   const { onPaginationChange, pagination } = usePagination()

//   // Извлечение `filter_search` при монтировании и обновлении
//   useEffect(() => {
//     const filterParam = searchParams.get("filter_search") || ""
//     setSearchQueryDraft(filterParam)
//     setSearchQuery(filterParam)
//   }, [searchParams])

//   const { data, isPending } = useGetStocks({
//     page: pagination.pageIndex + 1,
//     perPage: pagination.pageSize,
//     searchQuery, // передаем фильтр как query параметр
//   })

//   useEffect(() => {
//     if (data) {
//       setStocks(data.data)
//       setCount(data.meta.total)
//     }
//   }, [data])

//   const handleSearchChange = (newSearchQuery: string) => {
//     setSearchQueryDraft(newSearchQuery) // Обновляем черновой фильтр
//   }

//   const applyFilters = () => {
//     setSearchQuery(searchQueryDraft) // Подтверждаем фильтр
//     const params = new URLSearchParams(searchParams.toString())
//     if (searchQueryDraft) {
//       params.set("filter_search", searchQueryDraft)
//     } else {
//       params.delete("filter_search")
//     }
//     router.push(`?${params.toString()}`)
//     onPaginationChange({ pageIndex: 0, pageSize: pagination.pageSize })
//   }

//   const stockArray = useMemo(() => convertToStockArray(stocks), [stocks])
//   const handleDelete = () => null

//   return (
//     <div className="container px-3 py-1 pt-20 md:pt-5">
//       <TextFilterInput
//         value={searchQueryDraft} // Отображаем черновик
//         onChange={(e) => handleSearchChange(e.target.value)} // Обновляем черновик
//         applyFilter={applyFilters} // Применяем фильтр
//         placeholder="Искать по артикулу или описанию ..."
//       />
//       <DataTable
//         columns={ProductsTableColumns}
//         data={stockArray}
//         loading={isPending}
//         rowCount={count}
//         handleDelete={handleDelete}
//         manualPagination={true}
//         pagination={pagination}
//         onPaginationChange={onPaginationChange}
//       />
//     </div>
//   )
// }

export { AllStocks }
