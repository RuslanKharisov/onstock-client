import { ActionButtons } from "@/shared/ui/action-buttons";
import { deleteStockElement } from "@/shared/api/stock";
import { useSession } from "next-auth/react";

const Actions = ({ id }: { id: string }) => {
  const {data, status} =  useSession()

  if(!data) return null

  const onDelete = () => {
    deleteStockElement(id, data.backendTokens.accessToken)
  };

  return (
    <ActionButtons
      onDelete={onDelete}
    />
  );
};

export { Actions };