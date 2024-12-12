import { auth } from "@/entities/user/auth"
import { StockList } from "@/widgets/stock"
import { ApdateStock } from "@/widgets/update-stock/update-stock"

async function PersonalStock() {
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
