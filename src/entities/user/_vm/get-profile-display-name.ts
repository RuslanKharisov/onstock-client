import { SessionUser } from "../_domain/types"

export const getProfileDisplayName = (user: SessionUser) => {
  return user.name ? user.name : user.email
}
