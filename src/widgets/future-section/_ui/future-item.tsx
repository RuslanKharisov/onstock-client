import { LucideIcon } from "lucide-react"

interface FutureItemProps {
  title: string
  text: string
  icon: LucideIcon
}

const FutureItem = ({ title, text, icon:Icon }: FutureItemProps) => {
  return (
    <div>
      <div className="bg-primary dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
      {Icon && <Icon size={20} color="white"/> }
      </div>
      <h3 className="mb-2 text-xl font-bold dark:text-white">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{text}</p>
    </div>
  )
}

export default FutureItem