import { Supplier } from "@/entities/supplier/_domain/types"
import { Telegram } from "@/shared/icons/telegram"
import { WhatsApp } from "@/shared/icons/whatsapp"
import { Badge } from "@/shared/ui/badge"
import { Skeleton } from "@/shared/ui/skeleton"
import { cn } from "@/shared/ui/utils"
import { Home, MapPinIcon } from "lucide-react"
import Image from "next/image"

interface AdressCardProps {
  supplier: Supplier
  className?: string
  viewMode?: "grid" | "list"
}

const AdressCard = ({ supplier, className, viewMode }: AdressCardProps) => {
  return (
    <div className={(cn(""), className)}>
      <div
        className={`grid
          ${viewMode === "grid" ? "mb-4 max-w-fit gap-4" : "grid-cols-4 gap-4"}
        `}
      >
        <div className="flex space-x-4">
          <div className="w-24">
            {supplier.logoUrl ? (
              <Image
                width={100}
                height={100}
                className="h-full w-full rounded-lg  object-cover"
                src={`${supplier?.logoUrl}`}
                alt="Logo image"
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <Badge variant="success">Подтвержден</Badge>
              <Badge
                variant={supplier?.type === "SI" ? "secondary" : "default"}
              >
                {supplier?.type && supplier?.type === "SI"
                  ? "Дистрибьютор"
                  : "Интегратор"}
              </Badge>
            </div>
            <div className="flex grow flex-col justify-between">
              <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                {supplier.name}
              </h2>
              <a href={`${supplier?.siteUrl}`}>
                <p className="mb-0.5 font-medium text-gray-900 dark:text-white">
                  {" "}
                  {supplier.siteUrl}
                </p>
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <dl>
            <dt className="font-semibold text-gray-900 dark:text-white">
              Мы находимся по адресу
            </dt>
            <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Home size={16} />
              {supplier?.address?.city?.region?.country?.name},{" "}
              {supplier?.address?.city?.region?.name},{" "}
              {supplier?.address?.city?.name}, {supplier?.address?.street},{" "}
              {supplier?.address?.house}
            </dd>
          </dl>

          <dl>
            <dt className="font-semibold text-gray-900 dark:text-white">
              Адрес нашего склада
            </dt>
            <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MapPinIcon size={16} />
              {supplier?.address?.city?.region?.country?.name},{" "}
              {supplier?.address?.city?.name}, {supplier?.address?.street},{" "}
              {supplier?.address?.house}
            </dd>
          </dl>
        </div>
        <div className="flex flex-col space-y-4">
          <dl className="">
            <dt className="font-semibold text-gray-900 dark:text-white">
              Напишите нам
            </dt>
            <dd className="text-gray-500 dark:text-gray-400">
              {supplier.email}
            </dd>
          </dl>

          <dl>
            <dt className="font-semibold text-gray-900 dark:text-white">
              Позвоните нам
            </dt>
            <dd className="text-gray-500 dark:text-gray-400">
              {supplier.phoneWork}
            </dd>
          </dl>
        </div>
        <div>
          <dt className="font-semibold text-gray-900 dark:text-white">
            Мы в соцсетях
          </dt>
          <div className="mt-4 flex gap-3  sm:mt-3 ">
            <a
              href="#"
              className="text-foreground/50 hover:text-primary dark:text-primary dark:hover:text-primary/65"
            >
              <WhatsApp size="22" />
            </a>
            <a
              href="#"
              className=" text-foreground/50 hover:text-primary dark:text-primary dark:hover:text-primary/65"
            >
              <Telegram size="22" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AdressCard }
