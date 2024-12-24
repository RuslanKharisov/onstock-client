export type CreateUserDto = {
  email: string;
  name: string;
  password?: string | null;
  provider?: string;
  providerAccountId?: string;
  type: string;
  image?: string | null;
}
