import { UsersTableColumns } from "@/entities/dashboard/_vm/users-table-columns"
import { userRepository } from "@/entities/user/_repositories/user"
import { auth } from "@/entities/user/auth"
import { UsersDataTable } from "@/widgets/users-data-table/users-data-table"

const SettingsPage = async () => {
  const session = await auth()
  const usersList = await userRepository.getAllUsers()
  return (
    <div className=" container mx-auto py-10">
      <h1 className=" mb-8 text-center text-3xl">Setting page</h1>
      <p className="mb-8">Список всех зарегистрированных пользователей:</p> 
      {usersList && (
        <UsersDataTable tableData={usersList} columns={UsersTableColumns} variant={"auth"} />
      )}
    </div>
  )
}

export default SettingsPage
