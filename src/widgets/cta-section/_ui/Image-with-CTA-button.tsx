"use client"

import { useTheme } from 'next-themes';
import { GoToStockButton } from "@/features/stock/go-to-stock-btn"
import { Button } from "@/shared/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const ImageWithCTAButton = () => {
  const { theme } = useTheme();
  console.log("🚀 ~ ImageWithCTAButton ~ theme:", theme)
  const imageSrc = theme === 'dark' ? '/images/SearchResultDark.webp' : '/images/SearchResult.webp';

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16">
        <Image
          width={1000}
          height={1000}
          src={imageSrc}
          style={{borderRadius:"8px"}}
          alt=""
        />
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight">
            Быстрый поиск промышленного оборудования по ключевым словам.
          </h2>
          <p className="mb-6 font-light md:text-lg">
            Вводите вы слово полностью, или лишь фрагмент необходимой
            характеристики, поисковый алгоритм выдаст вам все совпадения с
            информацией у кого это оборудование имеется в наличиии.
          </p>
          <GoToStockButton>
            <Button variant="default" size="lg" className='dark:text-white'>
              Начать поиск{" "}
              <span className="ms-3">
                <ArrowRight color="#ffffff" />
              </span>
            </Button>
          </GoToStockButton>
        </div>
      </div>
    </section>
  )
}

export { ImageWithCTAButton }
