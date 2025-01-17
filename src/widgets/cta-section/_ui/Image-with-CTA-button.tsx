"use client"

import { useTheme } from "next-themes"
import { GoToStockButton } from "@/features/stock/go-to-stock-btn"
import { Button } from "@/shared/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const ImageWithCTAButton = () => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])
  const imageSrc =
    theme === "dark"
      ? "/images/SearchResultDark.webp"
      : "/images/SearchResult.webp"

  return (
    <section className="">
      <div className="container items-center gap-8 pb-10 pt-5 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
        <div className="mt-4 flex flex-col items-center gap-3 md:mt-0 md:items-start">
          <h1 className="text-center text-xl font-extrabold tracking-tight md:text-start lg:text-4xl">
            Быстрый поиск промышленного оборудования по ключевым словам.
          </h1>
          <p className="text-center md:text-start md:text-lg">
            Оборудование АСУТП, КИП и электроприводы от ведущих производителей -
            всегда в наличии на складе поставщиков! Выберите лучшее решение по
            выгодной цене!
          </p>
          <GoToStockButton className="">
            <Button variant="default" size="lg" className="dark:text-white">
              Начать поиск{" "}
              <span className="ms-3">
                <ArrowRight color="#ffffff" />
              </span>
            </Button>
          </GoToStockButton>
        </div>
        <div className="hidden overflow-hidden rounded-lg shadow-md md:block ">
          {mounted && (
            <Image
              width={1000}
              height={1000}
              src={mounted? imageSrc : ""}
              style={{}}
              className="translate-x-1/4 translate-y-1/4 scale-150 md:translate-x-0 md:translate-y-0 md:scale-100"
              alt=""
            />
          )}
        </div>
      </div>
    </section>
  )
}

export { ImageWithCTAButton }
