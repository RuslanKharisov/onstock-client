import { FactoryIcon } from "@/shared/icons/factory-icon"

const ManufacturerItem = ({
  manufacturerName,
}: {
  manufacturerName: string
}) => {
  return (
    <a
      href="#"
      target="_blank"
      className="flex items-center gap-3 rounded-lg border border-gray-200 bg-card bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <FactoryIcon height={14} />
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {manufacturerName}
      </span>
    </a>
  )
}

export { ManufacturerItem }
