import { userRepository } from "@/entities/user/_repositories/user"
import { auth } from "@/entities/user/auth"
import { productsRepository } from "@/features/products-list/products.repository"

const SettingsPage = async () => {
  const session = await auth()
  const usersList = await userRepository.getAllUsers()
  return <div className=" h-screen flex flex-col justify-center items-center px-5">
    <h1>Setting page</h1>
    List of all registred users:
    {usersList && usersList.map((user, i) => (
      <ul key={i} className="flex gap-3">
        <li>{user.id}</li>
        <li>{user.role}</li>
        <li>{user.email}</li>
        <li>{user.emailVerified? user.emailVerified.toDateString() : "Email isn't Verified"}</li>
      </ul>
    ) ) }
    <br />
    Server session is : 
    {JSON.stringify(session)}
  </div>
}

export default SettingsPage
