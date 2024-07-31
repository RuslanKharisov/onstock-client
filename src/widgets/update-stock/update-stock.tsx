import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet"
import { UpdateFromFile } from "./_ui/UpdateFromFile"
import { UpdateFromForm } from "./_ui/UpdateFromForm"
import { Button } from "@/shared/ui/button"

export function ApdateStock({
  supplier,
  revalidatePagePath,
}: {
  supplier: getSupplier
  revalidatePagePath: string
}) {
  return (
    <section className="flex flex-col items-start gap-5 justify-between md:flex-row">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default">Добавить товар на склад</Button>
        </SheetTrigger>
        <SheetContent side="top" className="pt-12 overflow-scroll flex justify-center">
          <UpdateFromForm
            supplier={supplier}
            revalidatePagePath={revalidatePagePath}
          />
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default">Импортировать из файла</Button>
        </SheetTrigger>
        <SheetContent side="top" className="pt-12 overflow-scroll flex justify-center">
          <UpdateFromFile supplier={supplier} />
        </SheetContent>
      </Sheet>
    </section>
  )
}
