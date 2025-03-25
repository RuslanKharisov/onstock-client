import { getPersonalStock } from "@/entities/stock-personal.ts/api/get-personal-stock"
import { auth } from "@/entities/user/auth"
import { PrivatelStock } from "@/widgets/stock"
import { unstable_noStore as noStore } from "next/cache"
import { revalidatePath } from "next/cache"

export type SearchParams = {
  sku: string
  description: string
  page?: string
  perPage?: string
}

async function PersonalStock({ searchParams }: { searchParams: SearchParams }) {
  const searchQuery = searchParams || ""
  noStore()
  const session = await auth()
  if (!session) return false

  const userId = session?.user.id
  const accessToken = session?.backendTokens.accessToken

  // Получаем данные с сервера
  const personalStock = await getPersonalStock({
    userId,
    accessToken,
    data: {
      page: searchParams?.page,
      perPage: searchParams?.perPage,
      sku: searchParams?.sku,
      description: searchParams?.description,
    },
  })

  // Функция для обновления данных (вызов из клиента)
  async function updateStock() {
    "use server"
    revalidatePath("/personal-stock") // Обновляем страницу
  }

  return (
    <div className="container mx-auto px-5 pt-16 md:pt-8 lg:px-6">
      <PrivatelStock
        personalStock={personalStock}
        userId={userId}
        accessToken={accessToken}
        updateStock={updateStock}
        searchQuery={searchQuery}
      />
    </div>
  )
}

export default PersonalStock
