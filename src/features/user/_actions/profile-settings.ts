"use server"
import * as z from "zod"
import { ProfileSchema } from "../../../entities/user/_domain/schemas"
import { getAppSessionServer } from "@/entities/user/session.server"
import { userRepository } from "@/entities/user/_repositories/user"
import { profileRepository } from "@/entities/user/_repositories/profile"

const propsSchema = z.object({
  userId: z.string(),
})

export const profileSettings = async (
  values: z.infer<typeof ProfileSchema>,
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

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
  }

  await profileRepository.updateUser(dbUser.id, values)
  return { success: "Данные обновлены" }
}
