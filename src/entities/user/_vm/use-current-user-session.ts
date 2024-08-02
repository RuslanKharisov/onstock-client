import { useSession } from "next-auth/react"

export const useAppSession = () => {
  const session = useSession()

  return session
}
