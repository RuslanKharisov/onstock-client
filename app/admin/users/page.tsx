import { Role } from "@/entities/user/_domain/types"
import { getAllUsers } from "@/entities/user/api/get-all-users"
import { auth } from "@/entities/user/auth"
import { Users } from "@/widgets/admin/users"

type SearchParams = {
  page?: string
  perPage?: string
  role: Role
}

const UsersPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await auth()
  if (!session) return null

  const page = Number(searchParams?.page) || 1
  const perPage = Number(searchParams?.perPage) || 10
  const role = searchParams?.role || ""

  const accessToken = session?.backendTokens?.accessToken

  const data = await getAllUsers({ accessToken, data: { page, perPage, role } })
  const count = data.meta.total
  return (
    <div className=" container mx-auto mt-16 md:mt-5 md:py-5">
      <Users dataArray={data.data} count={count} />
    </div>
  )
}

export default UsersPage
