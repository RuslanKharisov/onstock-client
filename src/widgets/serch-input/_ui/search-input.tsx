"use client"
import { TextFilterInput } from "@/shared/ui/text-filter-input"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SearchInput() {
  const [searchQueryDraft, setSearchQueryDraft] = useState<string>("") // Для чернового ввода
  const router = useRouter()

  const handleSearchChange = (newSearchQuery: string) => {
    setSearchQueryDraft(newSearchQuery) // Обновляем черновой фильтр
  }

  const applyFilters = () => {
    router.push(`stock?filter_search=${searchQueryDraft}`)
  }

  return (
    <div className="py-5 ">
      <TextFilterInput
        onChange={(e) => handleSearchChange(e.target.value)}
        applyFilter={applyFilters} // Применяем фильтр
        placeholder="Искать по артикулу или описанию ..."
      />
    </div>
  )
}
