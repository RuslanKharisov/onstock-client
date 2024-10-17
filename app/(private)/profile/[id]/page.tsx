import { getSupplier } from "@/entities/supplier/_use-cases/get-supplier"
import { auth } from "@/entities/user/auth"
import UpdateProfileForm from "@/features/update-profile/update-profile-form"
import UpdateSupplierForm from "@/features/update-supplier/update-supplier-form"
import { getSupplierById } from "@/shared/api/supplier"
import { getUserById } from "@/shared/api/user/get-user-by-id"
import { Separator } from "@/shared/ui/separator"
import { Bill } from "@/widgets/bill/index"

type Props = {
  params: {
    id: string;
  };
};

export default async function ProfilePage(props: Props) {
  const session = await auth()
  if (!session) return null

  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken

  const supplier = await getSupplierById(userId, accessToken)

  
  const existingUser = await getUserById(userId, accessToken)

  return (
    <main className="container">
      <div className="py-8 text-center">
        <h1 className="mb-5">Личный кабинет</h1>
        <p className="text-lg text-muted-foreground">
          На этой странице вы можете обновить свои данные и данные компании.
        </p>
      </div>
      <Separator />
      <div className="flex flex-col justify-center gap-5 py-5 md:flex-row">
        <div>
        <UpdateSupplierForm session={session} supplier={supplier} revalidatePagePath="/profile"/>
        </div>
        <div>
          {existingUser && <UpdateProfileForm session={session} existingUser={existingUser}/>}
        </div>
      </div>
      <Bill/>
    </main>
  )
}
