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
  console.log("Supplier supplier ==> ", supplier)

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
            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
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
                    {supplier.country}, {supplier.city}, {supplier.street},{" "}
                    {supplier.houseNumber}
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
                    {supplier.country}, {supplier.city}, {supplier.street},{" "}
                    {supplier.houseNumber}
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
                  <div className="mt-4 flex space-x-6  sm:mt-1 ">
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <WhatsApp size="22" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Telegram size="22" />
                    </a>
                  </div>
                </dl>
              </div>
            </div>
            <button
              type="button"
              data-modal-target="accountInformationModal2"
              data-modal-toggle="accountInformationModal2"
              className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-auto"
            >
              <svg
                className="-ms-0.5 me-1.5 h-4 w-4"
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
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                ></path>
              </svg>
              Edit your data
            </button>
          </div>

          {/* <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
      <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Latest orders</h3>
      <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 pb-4 dark:border-gray-700 md:pb-5">
        <dl className="w-1/2 sm:w-48">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
            <a href="#" className="hover:underline">#FWB12546798</a>
          </dd>
        </dl>

        <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">11.12.2023</dd>
        </dl>

        <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">$499</dd>
        </dl>

        <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
          <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
            </svg>
            In transit
          </dd>
        </dl>

        <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
          <button
            id="actionsMenuDropdownModal10"
            data-dropdown-toggle="dropdownOrderModal10"
            type="button"
            className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
          >
            Actions
            <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
            </svg>
          </button>
          <div id="dropdownOrderModal10" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
            <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="actionsMenuDropdown10">
              <li>
                <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
                  </svg>
                  <span>Order again</span>
                </a>
              </li>
              <li>
                <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                  </svg>
                  Order details
                </a>
              </li>
              <li>
                <a href="#" data-modal-target="deleteOrderModal" data-modal-toggle="deleteOrderModal" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path>
                  </svg>
                  Cancel order
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 py-4 pb-4 dark:border-gray-700 md:py-5">
        <dl className="w-1/2 sm:w-48">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
            <a href="#" className="hover:underline">#FWB12546777</a>
          </dd>
        </dl>

        <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">10.11.2024</dd>
        </dl>

        <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">$3,287</dd>
        </dl>

        <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
          <dd className="mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
            </svg>
            Cancelled
          </dd>
        </dl>

        <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
          <button
            id="actionsMenuDropdownModal11"
            data-dropdown-toggle="dropdownOrderModal11"
            type="button"
            className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
          >
            Actions
            <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
            </svg>
          </button>
          <div id="dropdownOrderModal11" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
            <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="actionsMenuDropdown11">
              <li>
                <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
                  </svg>
                  <span>Order again</span>
                </a>
              </li>
              <li>
                <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                  </svg>
                  Order details
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 py-4 pb-4 dark:border-gray-700 md:py-5">
        <dl className="w-1/2 sm:w-48">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
            <a href="#" className="hover:underline">#FWB12546846</a>
          </dd>
        </dl>

        <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">07.11.2024</dd>
        </dl>

        <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">$111</dd>
        </dl>

        <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
          <dd className="mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
            </svg>
            Completed
          </dd>
        </dl>

        <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
          <button
            id="actionsMenuDropdownModal12"
            data-dropdown-toggle="dropdownOrderModal12"
            type="button"
            className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
          >
            Actions
            <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
            </svg>
          </button>
          <div id="dropdownOrderModal12" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
            <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="actionsMenuDropdown12">
              <li>
                <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
                  </svg>
                  <span>Order again</span>
                </a>
              </li>
              <li>
                <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                  </svg>
                  Order details
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-y-4 pt-4 md:pt-5">
        <dl className="w-1/2 sm:w-48">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
            <a href="#" className="hover:underline">#FWB12546212</a>
          </dd>
        </dl>

        <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">18.10.2024</dd>
        </dl>

        <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">$756</dd>
        </dl>

        <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
          <dd className="mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
            </svg>
            Completed
          </dd>
        </dl>

        <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
          <button
            id="actionsMenuDropdownModal13"
            data-dropdown-toggle="dropdownOrderModal13"
            type="button"
            className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
          >
            Actions
            <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path>
            </svg>
          </button>
          <div id="dropdownOrderModal13" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
            <ul className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="actionsMenuDropdown13">
              <li>
                <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
                  </svg>
                  <span>Order again</span>
                </a>
              </li>
              <li>
                <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                  </svg>
                  Order details
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div> */}
        </div>
      </section>
    </>
  )
}
