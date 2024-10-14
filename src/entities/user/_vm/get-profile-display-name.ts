import { User } from "next-auth"

export const getProfileDisplayName = (user: User) => {
  return user.name ? user.name : user.email
}
