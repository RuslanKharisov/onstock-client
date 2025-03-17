import { BlogArticle } from "@/widgets/blog"
import { FutureSection } from "@/widgets/future-section/_ui/future-section"
import { HeroSection } from "@/widgets/hero-section/hero-section"
import Link from "next/link"
import { SearchInput } from "@/widgets/serch-input"
import { GetManufactorerList } from "@/entities/manufacturer/api/get-all-manufactories"
import { ManufacturersGrid } from "@/widgets/manufacturers"

export default async function Home() {
  const data = await GetManufactorerList({
    page: 1,
    perPage: 48,
    filters: { name: "" },
  })
  return (
    <>
      <div className="mt-[70px] min-h-screen border-r-red-400 md:mt-0">
        <div className="mb-8 py-5 md:py-20">
          <div className="container">
            <h1 className="text-center">
              Prom-Stock: Поиск промышленного оборудования
            </h1>
            <SearchInput />
            <p className="text-sm">
              Попробуйте выполнить поиск по точному совпадению, например{" "}
              <span className="text-destructive hover:text-primary">
                <Link href="stock?filter_search=6ES7212-1BE40-0XB0">
                  6ES7212-1BE40-0XB0
                </Link>
              </span>
              , или по частичному совпадению, например{" "}
              <span className="text-destructive hover:text-primary">
                <Link href="stock?filter_search=24V">24V</Link>
              </span>
              .
            </p>
          </div>
        </div>
        <HeroSection />
        <FutureSection />
        <ManufacturersGrid data={data.data} />
        <BlogArticle />
      </div>
    </>
  )
}
