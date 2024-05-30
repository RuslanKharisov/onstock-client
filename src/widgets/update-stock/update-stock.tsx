import { Layout } from "./_ui/Layout";
import { UpdateFromFile } from "./_ui/UpdateFromFile";
import {UpdateFromForm} from "./_ui/UpdateFromForm";

export function ApdateStock({supplier, revalidatePagePath}:{supplier: getSupplier, revalidatePagePath:string}) {
    return (
        <Layout 
        updateFromForm = {<UpdateFromForm supplier={supplier} revalidatePagePath={revalidatePagePath} />}
        updateFromFile = {<UpdateFromFile supplier={supplier} />}
        />
    );
}