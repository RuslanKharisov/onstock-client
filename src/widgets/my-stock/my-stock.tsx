import { revalidatePath } from "next/cache";
import { Layout } from "./ui/layout";
import { StockList } from "./ui/stock-list";

export async function MyStock({
  variant,
  stockList,
}: {
  variant: "auth" | "private" | "public";
  stockList:StockListElementWithRelations[];
}) {
  const isProfile = variant !== "auth";


  return (
    <Layout
      table={<StockList stockList={stockList} />}
    />
  );
}
 