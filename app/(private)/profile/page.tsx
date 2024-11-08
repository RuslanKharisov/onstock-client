// import { getSupplier } from "@/entities/supplier/_use-cases/get-supplier"
import { auth } from "@/entities/user/auth"
import UpdateProfileForm from "@/features/update-profile/update-profile-form"
import UpdateSupplierForm from "@/features/update-supplier/update-supplier-form"
import { getSupplier } from "@/shared/api/supplier"
import { getUserById } from "@/shared/api/user/get-user-by-id"
import { Separator } from "@/shared/ui/separator"


type Props = {
  params: {
    id: string;
  };
};

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
      <div className="py-5 text-center">
        <h1 className="">
          На этой странице вы можете обновить свои данные и данные компании.
        </h1>
      </div>
      <Separator />
      <div className="flex flex-col justify-center items-center lg:items-start gap-5 py-10 md:flex-row">
        <UpdateSupplierForm session={session} supplier={supplier} revalidatePagePath="/profile"/>
        <UpdateProfileForm session={session} existingUser={existingUser}/>
      </div>
    </main>
  )
}
