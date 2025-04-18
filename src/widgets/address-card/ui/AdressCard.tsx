import { StoreIcon } from "@/shared/icons/store"
import { Telegram } from "@/shared/icons/telegram"
import { WhatsApp } from "@/shared/icons/whatsapp"
import Link from "next/link"

interface AdressCardProps {
  supplier: Supplier
}

const AdressCard = ({ supplier }: AdressCardProps) => {
  return (
    <div className="flex items-center gap-3 rounded-lg  bg-gradient-to-r from-slate-400 from-0% to-slate-200 to-100% px-3 shadow dark:bg-gradient-to-r dark:from-slate-800 dark:from-0% dark:to-slate-900 dark:to-100% sm:flex">
      <Link href={`/supplier/${supplier.id}`}>
        <StoreIcon className="mx-auto h-[100px] w-[100px] rounded-lg sm:rounded-none sm:rounded-l-lg" />
      </Link>
      <div className="p-3 font-light">
        <h3 className="text-xl font-bold tracking-tight">
          <Link href={`/supplier/${supplier.id}`}>{supplier.name}</Link>
        </h3>
        <span className="">{supplier?.siteUrl}</span>
        <p className="mb-4 mt-3">
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
