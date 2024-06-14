import { auth } from "@/entities/user/auth"

const SettingsPage = async () => {
  const session = await auth()
  console.log("🚀 ~ SettingsPage ~ session:", session)
  return <div className=" h-screen flex flex-col justify-center items-center">
    <h1>Setting page</h1>
    Session is : 
    {JSON.stringify(session)}
  </div>
}

export default SettingsPage
