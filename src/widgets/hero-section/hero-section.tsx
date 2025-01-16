import { LoginButton } from "@/features/login-user/login-button"
import { GoToStockButton } from "@/features/stock/go-to-stock-btn"
import { Button } from "@/shared/ui/button"
import { ArrowRight } from "lucide-react"

export const HeroSection = () => {
  return (
    <section className="md:py-8">
      <div className=" md:container">
        <div className="flex flex-col gap-2 rounded-lg overflow-hidden bg-[url('/images/equipment_warehouse.webp')] bg-cover bg-center bg-no-repeat md:flex-row md:gap-5">
          <div className="p-2 md:w-1/2 md:p-5">
            <div className="flex h-full flex-col items-center justify-center gap-5 rounded-lg bg-black/60 px-20 py-10 ">
              <h2 className="text-center text-xl font-black text-primary sm:text-3xl md:text-3xl md:leading-10 lg:text-3xl ">
                Поможем найти
              </h2>
              <p className="text-center text-base font-extrabold text-white sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl">
                Поиск оборудования для <span className="whitespace-nowrap">АСУ ТП</span> на складах в
                России и СНГ
              </p>
              <GoToStockButton>
                <Button variant="default" size="lg" className="dark:text-white">
                  Перейти в каталог{" "}
                  <span className="ms-5">
                    <ArrowRight color="#ffffff" />
                  </span>
                </Button>
              </GoToStockButton>
            </div>
          </div>
          <div className="col-start-4 p-2 md:w-1/2 md:p-5">
            <div className="flex h-full flex-col items-center justify-center gap-5 rounded-lg bg-black/60 px-20 py-10 ">
              <h2 className="text-center text-xl font-black text-destructive sm:text-3xl md:text-3xl md:leading-10 lg:text-3xl ">
                Поможем быстро продать
              </h2>
              <p className="text-center text-base font-extrabold text-white sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl">
                Зарегистрируйтесь и продавайте оборудование с вашего склада
              </p>
              <LoginButton>
                <Button variant="destructive" size="lg">
                  Стать поставщиком
                </Button>
              </LoginButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
