import { auth } from "@/entities/user/auth"

const SettingsPage = async () => {
  const session = await auth()
  console.log("🚀 ~ SettingsPage ~ session:", session)
  return <div>
    Session is : 
    {JSON.stringify(session)}
  </div>
}

export default SettingsPage
