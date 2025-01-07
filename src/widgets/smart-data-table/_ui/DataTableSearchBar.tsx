"use client"

import { useState } from "react"
import { CategorySelector } from "./category-selector"
import { useGetCategories } from "@/entities/category/_api/category.queries"
import { TextFilterInput } from "./text-filter-input"

interface DataTableSearchBarProps {
  table: any
  applyFilter: () => void
}

export function DataTableSearchBar({
  table,
  applyFilter,
}: DataTableSearchBarProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined)

  const { data: categories } = useGetCategories()

  return (
    <div className="my-5 flex flex-col items-center justify-center gap-5 py-4 sm:flex-row">
      <TextFilterInput
        name="sku"
        placeholder="Искать по артикулу ..."
        value={(table.getColumn("sku")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("sku")?.setFilterValue(event.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") applyFilter()
        }}
        applyFilter={applyFilter}
      />

      <TextFilterInput
        name="description"
        placeholder="Искать в описании ..."
        value={
          (table.getColumn("description")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("description")?.setFilterValue(event.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") applyFilter()
        }}
        applyFilter={applyFilter}
      />

      <CategorySelector
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
    </div>
  )
}
