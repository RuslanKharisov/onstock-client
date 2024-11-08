import { auth } from "@/entities/user/auth";
import UpdateSupplierForm from "@/features/update-supplier/update-supplier-form";
import { getSupplier } from "@/shared/api/supplier";


async function Company() {
  const session = await auth()
  if (!session) return null

  const userId = session.user.id
  const accessToken = session.backendTokens.accessToken
  const supplier = await getSupplier(userId, accessToken)

  return (
    <div className="flex justify-center items-center">
      <UpdateSupplierForm session={session} supplier={supplier} revalidatePagePath="/profile"/>
    </div>
  );
}

export default Company;