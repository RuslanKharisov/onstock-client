"use server"
import * as z from "zod"
import { profileSchema } from "../../../entities/user/_domain/schemas"
import { useCurrentUser } from "@/entities/user/_vm/use-current-user-session"
import { getAppSessionServer } from "@/entities/user/session.server"
import { userRepository } from "@/entities/user/_repositories/user"
import { profileRepository } from "@/entities/user/_repositories/profile"

const propsSchema = z.object({
  userId: z.string(),
})

export const profileSettings = async (
  values: z.infer<typeof profileSchema>,
) => {
  const session = await getAppSessionServer()
  const user = session?.user
  if (!user) {
    return { error: "Unauthorized" }
  }

  const dbUser = await userRepository.getUserById(user.id)
  if (!dbUser) {
    return { error: "Unauthorised" }
  }

  await profileRepository.updateUser(dbUser.id, values)
}
