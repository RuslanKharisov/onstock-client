"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { TextFilterInput } from "@/shared/ui/text-filter-input"
import { Spinner } from "@/shared/ui/spinner"

export function StockSearchBar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [filters, setFilters] = useState({
    sku: searchParams.get("sku") || "",
    description: searchParams.get("description") || "",
  })

  const handleChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (filters.sku) params.set("sku", filters.sku)
    else params.delete("sku")

    if (filters.description) params.set("description", filters.description)
    else params.delete("description")

    params.set("page", "1")

    startTransition(() => {
      router.push(`?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <TextFilterInput
        value={filters.sku}
        onChange={(e) => handleChange("sku", e.target.value)}
        applyFilter={applyFilters}
        placeholder="Искать по артикулу..."
      />
      <TextFilterInput
        value={filters.description}
        onChange={(e) => handleChange("description", e.target.value)}
        applyFilter={applyFilters}
        placeholder="Искать по описанию..."
      />

      {isPending && <Spinner className="w-fit" />}
    </div>
  )
}
