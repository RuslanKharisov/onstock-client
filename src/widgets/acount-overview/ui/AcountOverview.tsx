import { GeoIcon } from "@/shared/icons/geo-icon"
import { Mail } from "@/shared/icons/geo-icon copy"
import { Phone } from "@/shared/icons/phone"
import { Smartphone } from "@/shared/icons/smart-phone"
import { Telegram } from "@/shared/icons/telegram"
import { WhatsApp } from "@/shared/icons/whatsapp"
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
        <div className="flex flex-col gap-5 py-4 md:py-8">
          <div className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-slate-900 from-0% to-slate-700 to-100% py-20">
            <h1 className="flex items-center text-xl font-bold leading-none  text-white sm:text-2xl">
              Компания: &quot;{supplier.name}&quot;
            </h1>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
            <div className="space-y-4 font-light">
              <a href="#" className="flex items-center space-x-3">
                <GeoIcon height={24} width={24} />
                <span className="">
                  <p className="">
                    {supplier?.address?.city?.region?.country?.name}{" "}
                    {supplier?.address?.city?.region?.name}{" "}
                    {supplier?.address?.city?.name} {supplier?.address?.street}{" "}
                    {supplier?.address?.house}
                  </p>
                </span>
              </a>
              <a href="#" className="flex items-center space-x-5">
                <Mail />
                <span className="">{supplier.email}</span>
              </a>
              <a href="#" className="flex items-center space-x-3">
                <Phone />
                <span className="">{supplier.phoneWork}</span>
              </a>
              <a href="#" className="flex items-center space-x-3">
                <Smartphone />
                <span className="">{supplier.phoneMobile}</span>
              </a>
              <Socials className="gap-0" socialsData={socialsData} size="28" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { AcountOverview }
