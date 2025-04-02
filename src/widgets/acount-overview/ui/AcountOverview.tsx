import { StoreIcon } from "@/shared/icons/store"
import { Telegram } from "@/shared/icons/telegram"
import { WhatsApp } from "@/shared/icons/whatsapp"
import { Badge } from "@/shared/ui/badge"
import { Socials } from "@/widgets/socials"

interface AdressCardProps {
  supplier: Supplier
}

const AcountOverview = ({ supplier }: AdressCardProps) => {
  const socialsData = [
    {
      icon: WhatsApp,
      link: `https://api.whatsapp.com/send/?phone=${supplier.whatsappNumber}`,
      label: "Напишите в WhatsApp",
    },
    {
      icon: Telegram,
      link: `https://t.me/${supplier.telegramAccount}`,
      label: "Напишите в Telegram",
    },
  ]

  return (
    <section className="bg-white py-14 antialiased dark:bg-gray-900 md:py-8">
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <div className="py-4 md:py-8">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <StoreIcon className="h-20 w-20 rounded-lg bg-accent p-2" />
                {/* <img
                  className="h-16 w-16 rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                  alt="Helene avatar"
                /> */}
                <div>
                  <Badge variant="success" className="mb-2">
                    {supplier.supplierType?.name
                      ? supplier.supplierType?.name
                      : "Не указан"}
                  </Badge>

                  <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                    {supplier.name}
                  </h2>
                </div>
              </div>
              <dl className="">
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Email / Электронная почта
                </dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  {supplier.email}
                </dd>
              </dl>
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Address / Адрес
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
                  <p className="font-light text-gray-500 dark:text-gray-400">
                    {supplier?.address?.city?.region?.country?.name}{" "}
                    {supplier?.address?.city?.region?.name}{" "}
                    {supplier?.address?.city?.name} {supplier?.address?.street}{" "}
                    {supplier?.address?.house}
                  </p>
                </dd>
              </dl>
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Inventory Address / Адрес склада
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
                  <p className="font-light text-gray-500 dark:text-gray-400">
                    {supplier?.address?.city?.region?.country?.name}{" "}
                    {supplier?.address?.city?.region?.name}{" "}
                    {supplier?.address?.city?.name} {supplier?.address?.street}{" "}
                    {supplier?.address?.house}
                  </p>
                </dd>
              </dl>
            </div>
            <div className="space-y-4">
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Phone Number / Номер телефона
                </dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  {supplier.phoneWork}/{supplier.phoneMobile}
                </dd>
              </dl>

              <dl>
                <dt className="mb-1 font-semibold text-gray-900 dark:text-white">
                  Акаунты
                </dt>
                <dd className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                  <Socials
                    className="gap-0"
                    socialsData={socialsData}
                    size="28"
                  />
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { AcountOverview }
