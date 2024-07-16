import { useCurrentUser } from "./use-current-user-session"

export const useRole = () => {
  const session = useCurrentUser()
  return session?.role
}
