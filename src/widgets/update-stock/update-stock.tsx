"use client"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet"
import { UpdateFromFile } from "./_ui/UpdateFromFile"
import { UpdateFromForm } from "./_ui/UpdateFromForm"
import { Button } from "@/shared/ui/button"
import { Session } from "next-auth"
import { useGetSupplier } from "@/entities/supplier/api/supplier.queries"
import { useRouter } from "next/navigation"

export function ApdateStock({
  userId,
  accessToken,
  session
}: {
  userId: string
  accessToken: string
  session: Session
}) {
  const router = useRouter()
  const {data} = useGetSupplier(
      userId,
      accessToken,
    )

    if (!data)
    return (
      <main className="container flex flex-col items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
        <h1 className="mb-8 text-center text-destructive">
          Осталось внести данные компании поставщика
        </h1>
        <h2 className=" mb-8 text-center">
          После регистрации компании появится возможность загрузить складские запасы.
        </h2>
        <div className="mb-8 ">
            <Button onClick={() => router.push('/profile')} size="lg">Указать данные компании</Button>
        </div>
      </main>
    )

  return (
    <section className="flex flex-wrap items-start gap-5 justify-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm">Добавить товар на склад</Button>
        </SheetTrigger>
        <SheetContent side="top" className="pt-12 overflow-scroll flex flex-col items-center justify-center">
        <SheetHeader className="max-w-xs">
          <SheetTitle className="text-center"></SheetTitle>
          <SheetDescription className="text-center">
            Внесите данные продукта. Нажмите Добавить, что-бы сохранить продукт в базе данных .
          </SheetDescription>
        </SheetHeader>
        {
          data && <UpdateFromForm
            supplier={data}
            accessToken={accessToken}
          />

        }
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm" >Импортировать из файла</Button>
        </SheetTrigger>
        <SheetContent side="top" className="pt-12 overflow-scroll flex flex-col items-center justify-center">
        <SheetHeader className="max-w-xs">
          <SheetTitle className="text-center"></SheetTitle>
          <SheetDescription className="text-center">
            Скачайте шаблон. После заполнения выберите файл для загрузки. Нажмите Добавить, что-бы сохранить список в базе данных .
          </SheetDescription>
        </SheetHeader>
        {
          data && <UpdateFromFile supplier={data} accessToken={accessToken}/>
        }
        </SheetContent>
      </Sheet>
    </section>
  )
}
