import { supplierQueries } from "@/entities/supplier/api/supplier.queries"
import { auth } from "@/entities/user/auth"
import { getSupplier } from "@/shared/api/supplier"
import { ButtonWrapper } from "@/shared/lib/button-wrapper"
import { Button } from "@/shared/ui/button"
import { StockList } from "@/widgets/stock"
import { SupplierInfo } from "@/widgets/supplier-info"
import { ApdateStock } from "@/widgets/update-stock/update-stock"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

async function PersonalStock({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return null

  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken

  return (
    <main className="container mx-auto px-5 pt-8 lg:px-6">

      <ApdateStock
        accessToken={accessToken}
        userId={userId}
        session={session}
      />

      <StockList userId={userId} accessToken={accessToken} />
    </main>
  )
}

export default PersonalStock
