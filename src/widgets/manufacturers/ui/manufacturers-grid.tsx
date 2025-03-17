import { Manufacturer } from "@/entities/manufacturer/_domain/types"
import { ManufacturerItem } from "./manufacturer-item"

const ManufacturersGrid = ({ data }: { data: Manufacturer[] }) => {
  return (
    <section className="container py-8 sm:py-16 lg:px-6">
      <h1 className="mb-8 text-center text-xl font-extrabold tracking-tight lg:mb-12 lg:text-4xl">
        Здесь отображаются производители, чье оборудование представлено на
        складах.
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((manufacturer, i) => (
          <ManufacturerItem key={i} manufacturerName={manufacturer.name} />
        ))}
      </div>
    </section>
  )
}

export { ManufacturersGrid }
