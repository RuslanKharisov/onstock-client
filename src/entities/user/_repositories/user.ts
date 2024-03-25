// перехватчик для Prisma адаптера 

import { UserEntity, UserId } from "../_domain/types";

const public_url = process.env.NEXT_PUBLIC_API_URL

export class UserRepository {
    async getUserById(userId: UserId): Promise<UserEntity> {
      const response = await fetch(`${public_url}/users/${userId}`);
      const data = await response.json();
      return data;
    }
  
    async createUser(user: UserEntity): Promise<UserEntity> {
      const response = await fetch(`${public_url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    }
  }
  
  export const userRepository = new UserRepository();