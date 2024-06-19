export type UserId = string
export type Role = "ADMIN" | "SUPPLIER" | "USER"

export const ROLES: Record<Role, Role> = {
  ADMIN: "ADMIN",
  SUPPLIER: "SUPPLIER",
  USER: "USER",
}

export type CreateUserCommand = {
  email: string
  name: string
  password?: string
}

export type UserEntity = {
  id?: String
  name?: string | null
  email?: string
  image?: string | null
  role?: Role
  emailVerified?: Date | null
  password?: string | null
}

export type SessionEntity = {
  user?: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: Role
  }
  expires: string
}

// Projetions

export type Profile = {
  email?: string | null
  name?: string | null
  image?: string | null
}

export type VerificationToken = {
  id: String
  token: String
  email: String
  expires: Date
}
