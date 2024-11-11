import { auth } from "@/entities/user/auth"
import { getSupplier } from "@/shared/api/supplier"
import { ButtonWrapper } from "@/shared/lib/button-wrapper"
import { Button } from "@/shared/ui/button"
import { StockList } from "@/widgets/stock"
import { SupplierInfo } from "@/widgets/supplier-info"
import { ApdateStock } from "@/widgets/update-stock/update-stock"

async function PersonalStock({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return null

  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken
  const supplier = await getSupplier(userId, accessToken)

  if (!supplier)
    return (
      <main className="container flex h-screen flex-col items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
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

  // const stockProducts = await getStockById(userId, accessToken)

  return (
    <main className="container mx-auto px-4 py-8 lg:px-6 lg:py-16">
      <SupplierInfo supplier={supplier}/>
      
      {supplier && (
        <ApdateStock
          supplier={supplier}
          session={session}
          revalidatePagePath="/personal-stock"
        />
      )}

      <StockList userId={userId} accessToken={accessToken}/>
    </main>
  )
}


export default PersonalStock
