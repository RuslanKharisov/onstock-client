import { Supplier } from "@/entities/supplier/_domain/types"
import { StoreIcon } from "@/shared/icons/store"
import { Telegram } from "@/shared/icons/telegram"
import { WhatsApp } from "@/shared/icons/whatsapp"
import Link from "next/link"

interface AdressCardProps {
  supplier: Supplier
}

const AdressCard = ({ supplier }: AdressCardProps) => {
  return (
    <div className="items-center rounded-lg bg-gray-50 px-1 shadow dark:border-gray-700 dark:bg-gray-800 sm:flex">
      <Link href={`/supplier/${supplier.id}`}>
        {/* onClick={() => router.push(`/supplier/${supplier.id}`)} */}
        {/* заглушка под logo на будущее */}
        {/* <img
          className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
          alt="Sofia Avatar"
        /> */}
        <StoreIcon className="mx-auto h-[200px] w-[200px] rounded-lg sm:rounded-none sm:rounded-l-lg" />
      </Link>
      <div className="p-5">
        <h3 className="text-xl font-bold tracking-tight text-primary/95 dark:text-primary/95">
          <Link href={`/supplier/${supplier.id}`}>{supplier.name}</Link>
        </h3>
        <span className="text-primary/80 dark:text-primary/80">
          {supplier?.siteUrl}
        </span>
        <p className="mb-4 mt-3 font-light text-gray-500 dark:text-gray-400">
          {supplier?.address?.city?.region?.country?.name}{" "}
          {supplier?.address?.city?.region?.name}{" "}
          {supplier?.address?.city?.name} {supplier?.address?.street}{" "}
          {supplier?.address?.house}
        </p>
        <ul className="flex space-x-4 sm:mt-0">
          <li>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Telegram size="22" />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <WhatsApp size="22" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export { AdressCard }
