import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet"
import { UpdateFromFile } from "./_ui/UpdateFromFile"
import { UpdateFromForm } from "./_ui/UpdateFromForm"
import { Button } from "@/shared/ui/button"
import { Session } from "next-auth"

export function ApdateStock({
  supplier,
  session,
  revalidatePagePath,
}: {
  supplier: getSupplier
  session: Session
  revalidatePagePath: string

}) {
  return (
    <section className="flex flex-col items-start gap-5 justify-between md:flex-row">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default">Добавить товар на склад</Button>
        </SheetTrigger>
        <SheetContent side="top" className="pt-12 overflow-scroll flex flex-col items-center justify-center">
        <SheetHeader className="max-w-xs">
          <SheetTitle className="text-center"></SheetTitle>
          <SheetDescription className="text-center">
            Внесите данные продукта. Нажмите Добавить, что-бы сохранить продукт в базе данных .
          </SheetDescription>
        </SheetHeader>
          <UpdateFromForm
            supplier={supplier}
            session={session}
            revalidatePagePath={revalidatePagePath}
          />
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default">Импортировать из файла</Button>
        </SheetTrigger>
        <SheetContent side="top" className="pt-12 overflow-scroll flex flex-col items-center justify-center">
        <SheetHeader className="max-w-xs">
          <SheetTitle className="text-center"></SheetTitle>
          <SheetDescription className="text-center">
            Скачайте шаблон. После заполнения выберите файл для загрузки. Нажмите Добавить, что-бы сохранить список в базе данных .
          </SheetDescription>
        </SheetHeader>
          <UpdateFromFile supplier={supplier} session={session} revalidatePagePath={revalidatePagePath}/>
        </SheetContent>
      </Sheet>
    </section>
  )
}
