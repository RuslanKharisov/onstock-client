import { SessionUser } from "../types/types"

export const getProfileDisplayName = (user: SessionUser) => {
  return user.name ? user.name : user.email
}
