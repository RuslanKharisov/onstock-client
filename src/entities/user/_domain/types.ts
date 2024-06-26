export type UserId = string;
export type Role = "ADMIN" | "SUPPLIER" | "USER";

export const ROLES: Record<Role, Role> = {
  ADMIN: "ADMIN",
  SUPPLIER: "SUPPLIER",
  USER: "USER",
};

export type UserEntity = {
  id: UserId;
  email: string;
  role: Role;
  emailVerified?: Date | null;
  name?: string | null;
  image?: string | null;
};

export type SessionEntity = {
  user: {
    id: UserId;
    email: string;
    role: Role;
    name?: string | null;
    image?: string | undefined;
  };
  expires: string;
};

// Projetions

export type Profile = {
    email?: string;
    name?: string | null;
    image?: string | null;
  };