import { auth } from "@/entities/user/auth"
import UpdateProfileForm from "@/features/update-profile/update-profile-form"
import UpdateSupplierForm from "@/features/update-supplier/update-supplier-form"
import { getSupplier } from "@/shared/api/supplier"
import { getUserById } from "@/shared/api/user/get-user-by-id"
import { Separator } from "@/shared/ui/separator"


export default async function ProfilePage() {
  const session = await auth()
  if (!session) return null

  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken

  const supplier = await getSupplier(userId, accessToken)

  
  const existingUser = await getUserById(userId, accessToken)
  if (!existingUser) return (
    <h1 className="container  text-center py-52">Работы на сервере !!!</h1>
  ) 

  return (
    <main className="container ">
      <div className="flex flex-col justify-center items-center gap-5 py-3">
        <UpdateProfileForm session={session} existingUser={existingUser}/>
        <UpdateSupplierForm 
        userId={userId} 
        accessToken={accessToken}
      />
      </div>
    </main>
  )
}
