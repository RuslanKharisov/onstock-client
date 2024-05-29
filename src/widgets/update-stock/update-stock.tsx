import { InputFile } from "./_ui/InputFile";

export function ApdateStock({supplier}:{supplier: getSupplier}) {
    return (
        <div className=" my-16 max-w-80">
        <h2 className=" text-center font-bold text-xl mb-5">Обновить из файла</h2>
        <InputFile supplier={supplier} />
        </div>
        
    );
}