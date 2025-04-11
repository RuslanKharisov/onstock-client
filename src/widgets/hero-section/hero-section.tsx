import { RegisterButton } from "@/features/register-user"
import { Button } from "@/shared/ui/button"

export const HeroSection = () => {
  return (
    <div className="md:py-8">
      <div className=" md:container">
        <div className="flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg bg-[url('/images/equipment_warehouse.webp')] bg-cover bg-center bg-no-repeat md:flex-row md:gap-5">
          <div className="w-full p-6">
            <div className="flex h-full  flex-col items-center justify-center gap-5 rounded-lg bg-black/60 px-20 py-10 ">
              <p className="text-center text-base font-extrabold text-white sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl">
                Подключить склад
              </p>
              <p className="text-center text-xl font-black text-destructive sm:text-3xl md:text-3xl md:leading-10 lg:text-3xl ">
                Поможем быстро продать
              </p>
              <RegisterButton>
                <Button variant="secondary" size="lg">
                  Регистрация
                </Button>
              </RegisterButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
