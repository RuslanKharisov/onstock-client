import { dbClient } from "@/shared/lib/db";
import { Profile, UserId } from "../_domain/types";

export class ProfileRepository {
  async updateUser(userId: UserId, values: Partial<Profile>) {
    return await dbClient.user.update({
      where: { id: userId },
      data: {
        ...values
      },
    });
  }
}

export const profileRepository = new ProfileRepository();