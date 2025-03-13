import { FC, SVGProps } from "react"

interface FutureItemProps {
  title: string
  text: string
  icon: FC<SVGProps<SVGSVGElement>>
}

const FutureItem = ({ title, text, icon: Icon }: FutureItemProps) => {
  return (
    <div>
      <div className="dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary lg:h-12 lg:w-12">
        {Icon && <Icon color="white" />}
      </div>
      <h3 className="mb-2 text-xl font-bold dark:text-white">{title}</h3>
      <p className="md:text-lg">{text}</p>
    </div>
  )
}

export default FutureItem
