"use client"
"use client"

import { useGetSupplierInfo } from "@/entities/supplier/api/supplier.queries"
import { Telegram } from "@/shared/icons/telegram"
import { WhatsApp } from "@/shared/icons/whatsapp"
import { Badge } from "@/shared/ui/badge"
import { Skeleton } from "@/shared/ui/skeleton"
import Image from "next/image"

export default function Supplier({ params }: { params: { id: number } }) {
  const supplierId = Number(params.id)

  const { data: supplier, isPending } = useGetSupplierInfo(supplierId)

  if (isPending)
    return (
      <div className="container flex h-full flex-col items-center justify-center">
        <h1>... загружаем данные</h1>
      </div>
    )

  if (!supplier)
    return (
      <div className="container flex h-full flex-col items-center justify-center">
        <h1>Что то пошло не так</h1>
      </div>
    )

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-8">
        <div className="container px-4 2xl:px-0">
          <nav className="mb-4 flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="hover:text-primary-600 inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="me-2 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                    />
                  </svg>
                  Главная
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                  <a
                    href="#"
                    className="hover:text-primary-600 ms-1 text-sm font-medium text-gray-700 dark:text-gray-400 dark:hover:text-white md:ms-2"
                  >
                    Поставщики
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                    Поставщик
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">
            Подробнее о компании: &#34;{supplier.name}&#34;
          </h2>
          <div className="py-4 md:py-8">
            <div className="mb-4 grid max-w-fit gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
              <div className="space-y-4">
                <div className="flex h-24 space-x-4">
                  <div className="w-24">
                    {supplier.logoUrl ? (
                      <Image
                        width={100}
                        height={100}
                        className="h-full w-full rounded-lg  object-cover"
                        src={`${supplier.logoUrl}`}
                        alt="Logo image"
                      />
                    ) : (
                      <Skeleton className="h-full w-full" />
                    )}
                  </div>
                  <div className=" space-y-2">
                    <Badge variant="success">Подтвержден</Badge>
                    <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                      {supplier.name}
                    </h2>
                    <a href={`${supplier.siteUrl}`}>
                      <p className="mb-0.5 font-medium text-gray-900 dark:text-white">
                        {" "}
                        {supplier.siteUrl}
                      </p>
                    </a>
                  </div>
                </div>

                <dl>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Мы находимся по адресу
                  </dt>
                  <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <svg
                      className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                      />
                    </svg>
                    {supplier.address.city.region.country.name},{" "}
                    {supplier.address.city.region.name},{" "}
                    {supplier.address.city.name}, {supplier.address.street},{" "}
                    {supplier.address.house}
                  </dd>
                </dl>

                <dl>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Адрес нашего склада
                  </dt>
                  <dd className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <svg
                      className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                    {supplier.address.city.region.country.name},{" "}
                    {supplier.address.city.name}, {supplier.address.street},{" "}
                    {supplier.address.house}
                  </dd>
                </dl>
              </div>
              <div className="flex flex-col justify-end space-y-4">
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

                <dl>
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
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
