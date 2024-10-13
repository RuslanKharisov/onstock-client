import { getSupplier } from "@/entities/supplier/_use-cases/get-supplier"
import { getAppSessionServer } from "@/entities/user/session.server"
import UpdateProfileForm from "@/features/update-profile/update-profile-form"
import UpdateSupplier from "@/features/update-supplier/update-supplier-form"
import { Separator } from "@/shared/ui/separator"
import { Bill } from "@/widgets/bill/index"

export default async function ProfilePage() {
  const session = await getAppSessionServer()
  console.log("🚀 ~ ProfilePage ~ session:", session)
  const sessionId = session?.user.id
  console.log("🚀 ~ ProfilePage ~ sessionId:", sessionId)

  if (!sessionId) return null

//  const supplier = ToDO реализовать логику получения поставщика из API NEST GS 
  const supplier = undefined

 

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
