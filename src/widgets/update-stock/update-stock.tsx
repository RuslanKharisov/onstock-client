import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { UpdateFromFile } from "./_ui/UpdateFromFile";
import {UpdateFromForm} from "./_ui/UpdateFromForm";
import { Button } from "@/shared/ui/button";

export function ApdateStock({supplier, revalidatePagePath}:{supplier: getSupplier, revalidatePagePath:string}) {

    return (
        <section className="flex items-start flex-col md:flex-row gap-5">
            <Sheet>
                        <SheetTrigger asChild>
                <Button variant="default">Обновить склад</Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <UpdateFromForm 
                    supplier={supplier} 
                    revalidatePagePath={revalidatePagePath}
                    />
                    <UpdateFromFile supplier={supplier} />
                </SheetContent>
            </Sheet>
        </section>

    );
}