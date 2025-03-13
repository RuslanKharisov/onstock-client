"use client"
import { useTheme } from "next-themes"
import { GoToStockButton } from "@/features/stock/go-to-stock-btn"
import { Button } from "@/shared/ui/button"
import Image from "next/image"
import { useMemo } from "react"
import { ArrowRightIcon } from "@/shared/icons/arrow-right-icon"

const ImageWithCTAButton = () => {
  const { theme } = useTheme()
  const imageSrc = useMemo(
    () =>
      theme === "dark"
        ? "/images/SearchResultDark.webp"
        : "/images/SearchResult.webp",
    [theme],
  )

  return (
    <section>
      <div className="container items-center gap-8 pb-10 pt-5 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
        <div className="mt-4 flex flex-col items-center gap-3 md:mt-0 md:items-start">
          <h2 className="text-center text-xl font-extrabold tracking-tight md:text-start lg:text-4xl">
            Быстрый поиск промышленного оборудования по ключевым словам.
          </h2>
          <p className="text-center md:text-start md:text-lg">
            Оборудование АСУТП, КИП и электроприводы от ведущих производителей -
            всегда в наличии на складе поставщиков! Выберите лучшее решение по
            выгодной цене!
          </p>
          <GoToStockButton>
            <Button variant="default" size="lg" className="dark:text-white">
              Начать поиск <ArrowRightIcon className="ms-3" />
            </Button>
          </GoToStockButton>
        </div>
        <div className="hidden overflow-hidden rounded-lg shadow-md md:block">
          <Image
            width={1000}
            height={1000}
            src={imageSrc}
            className="translate-x-1/4 translate-y-1/4 scale-150 md:translate-x-0 md:translate-y-0 md:scale-100"
            alt="Поиск оборудования"
          />
        </div>
      </div>
    </section>
  )
}

export { ImageWithCTAButton }
