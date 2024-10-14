import { getSupplier } from "@/entities/supplier/_use-cases/get-supplier"
import { auth } from "@/entities/user/auth"
import { getAppSessionServer } from "@/entities/user/session.server"
import UpdateProfileForm from "@/features/update-profile/update-profile-form"
import UpdateSupplier from "@/features/update-supplier/update-supplier-form"
import { refreshToken } from "@/shared/api/auth"
import { getUserById } from "@/shared/api/user/get-user-by-id"
import { Separator } from "@/shared/ui/separator"
import { Bill } from "@/widgets/bill/index"
import { use } from "react"

type Props = {
  params: {
    id: string;
  };
};

export default async function ProfilePage(props: Props) {
  const session = await auth()
  console.log("🚀 ~ ProfilePage ~ session:", session)
  if (!session) return null
  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken

//  const supplier = ToDO реализовать логику получения поставщика из API NEST GS 
  const supplier = undefined

  if (session.backendTokens.accessToken) {
    const existingUser = await getUserById(userId, accessToken)
    console.log("🚀 ~ ProfilePage ~ existingUser:", existingUser)
  }


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
        { supplier &&  <UpdateSupplier supplier={supplier} revalidatePagePath="/profile/"/>} 
        </div>
        <div>
          <UpdateProfileForm />
        </div>
      </div>
      <Bill/>
    </main>
  )
}
