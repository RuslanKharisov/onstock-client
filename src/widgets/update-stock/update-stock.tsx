"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet"
import { UpdateFromFile } from "./_ui/UpdateFromFile"
import { Button } from "@/shared/ui/button"
import { useGetSupplier } from "@/entities/supplier/api/supplier.queries"
import { useRouter } from "next/navigation"

export interface StockSettings {
  stockLenght: number
  tariffLimit: number
  freeSpace: number
}

export function ApdateStock({
  userId,
  accessToken,
  stockSettings,
}: {
  userId: string
  accessToken: string
  stockSettings: StockSettings | null
}) {
  const router = useRouter()
  const { data: supplier } = useGetSupplier(userId, accessToken)

  if (!supplier) {
    return (
      <main className="container flex flex-col items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
        <h1 className="mb-8 text-center text-destructive">
          Осталось внести данные компании поставщика
        </h1>
        <h2 className=" mb-8 text-center">
          После регистрации компании появится возможность загрузить складские
          запасы.
        </h2>
        <div className="mb-8 ">
          <Button onClick={() => router.push("/profile")} size="lg">
            Указать данные компании
          </Button>
        </div>
      </main>
    )
  }

  return (
    <section className="flex flex-wrap items-start justify-between gap-5">
      {/* <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="w-full sm:w-fit">Добавить товар на склад</Button>
        </SheetTrigger>
        <SheetContent
          side="top"
          className="flex flex-col items-center justify-center overflow-scroll pt-12"
        >
          <SheetHeader className="max-w-xs">
            <SheetTitle className="text-center"></SheetTitle>
            <SheetDescription className="text-center">
              Внесите данные продукта. Нажмите Добавить, что-бы сохранить
              продукт в базе данных .
            </SheetDescription>
          </SheetHeader>
          {data && <UpdateFromForm supplier={data} accessToken={accessToken} />}
        </SheetContent>
      </Sheet> */}

      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="w-full sm:w-fit">
            Импортировать из файла
          </Button>
        </SheetTrigger>
        <SheetContent
          side="top"
          className="flex flex-col items-center justify-center overflow-scroll pt-12"
        >
          <SheetHeader className="max-w-xs">
            <SheetTitle className="text-center"></SheetTitle>
            <SheetDescription className="text-center">
              Скачайте шаблон. После заполнения выберите файл для загрузки.
              Нажмите Добавить, что-бы сохранить список в базе данных .
            </SheetDescription>
          </SheetHeader>
          {stockSettings && (
            <UpdateFromFile
              accessToken={accessToken}
              limit={stockSettings.freeSpace}
            />
          )}
        </SheetContent>
      </Sheet>
    </section>
  )
}
