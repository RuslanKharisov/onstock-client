
import { auth } from "@/entities/user/auth"
import UpdateProfileForm from "@/features/update-profile/update-profile-form"
import UpdateSupplierForm from "@/features/update-supplier/update-supplier-form"
import { getUserById } from "@/entities/user/api/get-user-by-id"


export default async function ProfilePage() {
  const session = await auth()
  if (!session) return null
  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken
  
  const existingUser = await getUserById(userId, accessToken)
  if (!existingUser) return (
    <h1 className="container  text-center py-52">Работы на сервере !!!</h1>
  ) 

  return (
    <div className="container ">
      <div className="flex flex-col justify-center items-center gap-5 py-3">
        <UpdateProfileForm accessToken={accessToken} existingUser={existingUser}/>
        <UpdateSupplierForm 
        userId={userId} 
        accessToken={accessToken}
      />
      </div>
    </div>
  )
}
