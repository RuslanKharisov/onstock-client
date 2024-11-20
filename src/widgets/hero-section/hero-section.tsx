import { LoginButton } from "@/features/login-user/login-button"
import { GoToStockButton } from "@/features/stock/go-to-stock-btn"
import { Button } from "@/shared/ui/button"

export const HeroSection = () => {
  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden bg-[url('/images/equipment_warehouse.webp')] bg-cover bg-center bg-no-repeat md:flex-row md:gap-5">
      <div className="p-2 md:w-1/2 md:p-5">
        <div className="flex h-full flex-col items-center justify-center gap-5 rounded-lg bg-black/50 px-20 py-10 lg:py-36">
          <h2 className="text-center text-xl font-black text-primary sm:text-3xl md:text-3xl md:leading-10 lg:text-3xl xl:text-5xl">
            Поможем найти
          </h2>
          <p className="text-center text-base font-extrabold text-white sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl">
            Переходите в онлайн склад и находите оборудование на складах в
            России
          </p>
          <GoToStockButton>
            <Button variant="default" size="lg">
              Перейти в каталог
            </Button>
          </GoToStockButton>
        </div>
      </div>
      <div className="col-start-4 p-2 md:w-1/2 md:p-5">
        <div className="flex h-full flex-col items-center justify-center gap-5 rounded-lg bg-black/50 px-20 py-10 lg:py-36">
          <h2 className="text-center text-xl font-black text-destructive sm:text-3xl md:text-3xl md:leading-10 lg:text-3xl xl:text-5xl">
            Поможем быстро продать
          </h2>
          <p className="text-center text-base font-extrabold text-white sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl">
            Зарегистрируйтесь и продавайте оборудование с вашего склада
          </p>
          <LoginButton>
            <Button variant="outline" size="lg">
              Стать поставщиком
            </Button>
          </LoginButton>
        </div>
      </div>
    </div>
  )
}
