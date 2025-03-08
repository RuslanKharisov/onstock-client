"use client"
import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/shared/ui/card"
import { LayoutGrid, List } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group"
import { PaginatedSuppliersList } from "@/entities/supplier/_domain/types"
import { AdressCard } from "@/widgets/address-card"
import { useMediaQuery } from "usehooks-ts"
import { useRouter } from "next/navigation"

function SupplierList({
  suppliersData,
}: {
  suppliersData: PaginatedSuppliersList
}) {
  const router = useRouter()
  if (!suppliersData) return null
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const isDesktop = useMediaQuery("(min-width:768px)", {
    initializeWithValue: false,
  })

  const supplierList = suppliersData.data

  return (
    <div className="container px-3 py-1 pt-5">
      <div className="space-y-4">
        {/* Переключатель режима отображения */}
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value: "grid" | "list") => setViewMode(value)}
          className={` h-4 justify-end `}
        >
          {isDesktop ? (
            <>
              <ToggleGroupItem value="grid" aria-label="Сетка">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="Список">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </>
          ) : (
            ""
          )}
        </ToggleGroup>

        {/* Отображение поставщиков */}
        <div
          className={`
          ${viewMode === "grid" ? "grid grid-cols-1 gap-4 md:grid-cols-3" : "space-y-4"}
        `}
        >
          {supplierList.map((supplier) => (
            <Card
              key={supplier.id}
              className="cursor-pointer transition-shadow hover:shadow-lg"
              onClick={() => router.push(`/supplier/${supplier.id}`)}
            >
              <CardContent className="flex items-center justify-between gap-3 p-5 ">
                <AdressCard supplier={supplier} viewMode={viewMode} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export { SupplierList }
