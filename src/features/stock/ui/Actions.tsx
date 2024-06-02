import { ActionButtons } from "@/shared/ui/action-buttons";
import { revalidatePath } from "next/cache";
import { deleteStockElementItemAction } from "../lib/delete-stock-element";

const Actions = ({ id }: { id: string }) => {

  const revalidatePagePath = "/"

  const onDelete = () => {
    deleteStockElementItemAction(id, revalidatePagePath)
  };

  return (
    <ActionButtons
      onDelete={onDelete}
    />
  );
};

export { Actions };