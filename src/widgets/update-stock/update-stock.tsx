"use client"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet"
import { UpdateFromFile } from "./_ui/UpdateFromFile"
import { UpdateFromForm } from "./_ui/UpdateFromForm"
import { Button } from "@/shared/ui/button"
import { Session } from "next-auth"
import { supplierQueries } from "@/entities/supplier/api/supplier.queries"
import { useQuery } from "@tanstack/react-query"
import { ButtonWrapper } from "@/shared/lib/button-wrapper"

export function ApdateStock({
  userId,
  accessToken,
  session
}: {
  userId: string
  accessToken: string
  session: Session
}) {

  const {data, error, isLoading, isError} = useQuery(
    supplierQueries.detail(
      userId,
      accessToken,
    )
  )

    if (!data)
    return (
      <main className="container flex flex-col items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
        <h1 className=" mb-8 text-center">
          Осталось внести данные компании поставщика
        </h1>
        <div className="mb-8 ">
          <ButtonWrapper routeUrl={`/profile`}>
            <Button size="lg">Указать данные компании</Button>
          </ButtonWrapper>
        </div>
      </main>
    )

  return (
    <section className="flex flex-wrap items-start gap-5 justify-between">
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
            session={session}
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
          data && <UpdateFromFile supplier={data} session={session}/>
        }
        </SheetContent>
      </Sheet>
    </section>
  )
}
