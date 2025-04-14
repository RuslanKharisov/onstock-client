import { auth } from "@/entities/user/auth"
import UpdateProfileForm from "@/features/update-profile/update-profile-form"
import UpdateSupplierForm from "@/features/update-supplier/update-supplier-form"
import { getUserById } from "@/entities/user/api/get-user-by-id"
import ConnectSupplierApiForm from "@/features/connect-api-stock/connect-supplier-api-form"

export default async function ProfilePage() {
  const session = await auth()
  if (!session) return null
  const userId = session.user.id
  const accessToken = session?.backendTokens?.accessToken

  const existingUser = await getUserById(userId, accessToken)
  if (!existingUser)
    return (
      <h1 className="container  py-52 text-center">Работы на сервере !!!</h1>
    )

  return (
    <div className="container pb-16">
      <div className="flex flex-col items-center justify-center gap-5 pt-16 ">
        <UpdateProfileForm
          accessToken={accessToken}
          existingUser={existingUser?.user}
        />
        <UpdateSupplierForm userId={userId} accessToken={accessToken} />
        <ConnectSupplierApiForm accessToken={accessToken} />
      </div>
    </div>
  )
}
