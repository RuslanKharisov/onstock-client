import { auth } from "@/entities/user/auth"
import { StockList } from "@/widgets/stock"
import { ApdateStock } from "@/widgets/update-stock/update-stock"

async function PersonalStock() {
  const session = await auth()
  if (!session) return null

  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken

  return (
    <div className="container mx-auto px-5 pt-16 md:pt-8 lg:px-6">

      <ApdateStock
        accessToken={accessToken}
        userId={userId}
      />

      <StockList userId={userId} accessToken={accessToken} />
    </div>
  )
}

export default PersonalStock
