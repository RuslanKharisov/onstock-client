"use server"

import { z } from "zod";
import { ProfileSchema } from "../_domain/schemas";
// import { profileRepository } from "../_repositories/profile";
// import { userRepository } from "../_repositories/user";
import { getAppSessionServer } from "../session.server";

export const updateProfileData = async (
  values: z.infer<typeof ProfileSchema>,
) => {
  const session = await getAppSessionServer()
    const user = session?.user
  
    if (!user) {
      return { error: "Unauthorized" }
    }
  
    // const dbUser = await userRepository.getUserById(user.id)
  
    // if (!dbUser) {
    //   return { error: "Unauthorised" }
    // }
  
    // if (user.isOAuth) {
    //   values.email = undefined
    //   values.password = undefined
    // }
  
    // await profileRepository.updateUser(dbUser.id, values)
    // return { success: "Данные обновлены" }

    

}
