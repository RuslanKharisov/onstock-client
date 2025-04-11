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
import { useRouter } from "next/navigation"
import { UpdateFromForm } from "./_ui/UpdateFromForm"
import { useEffect, useState } from "react"
import { getSupplier } from "@/entities/supplier/api/get-supplier"

export function ApdateStock({
  userId,
  accessToken,
  updateStock,
}: {
  userId: string
  accessToken: string
  updateStock: () => Promise<void>
}) {
  const router = useRouter()
  const [supplier, setSupplier] = useState<Supplier>()
  const limit = 1000 // лимит разового количества загрузки

  useEffect(() => {
    async function fetchPosts() {
      const data = await getSupplier(userId, accessToken)
      setSupplier(data)
    }
    fetchPosts()
  }, [])

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
    <div className="flex flex-wrap items-start justify-between gap-5 py-5">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="w-full sm:w-fit">
            Добавить товар на склад
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col items-center justify-center overflow-scroll pt-12"
        >
          <SheetHeader className="max-w-xs">
            <SheetTitle className="text-center"></SheetTitle>
            <SheetDescription className="text-center">
              Внесите данные продукта. Нажмите Добавить, что-бы сохранить
              продукт в базе данных .
            </SheetDescription>
          </SheetHeader>

          <UpdateFromForm
            // limit={stockSettings.freeSpace}
            accessToken={accessToken}
            updateStock={updateStock}
          />
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" className="w-full sm:w-fit">
            Импортировать из файла
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col items-center justify-center overflow-scroll pt-12"
        >
          <SheetHeader className="max-w-xs">
            <SheetTitle className="text-center"></SheetTitle>
            <SheetDescription className="text-center">
              Скачайте шаблон. После заполнения выберите файл для загрузки.
              Нажмите Добавить, что-бы сохранить список в базе данных .
            </SheetDescription>
          </SheetHeader>
          <UpdateFromFile
            accessToken={accessToken}
            limit={limit}
            updateStock={updateStock}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
