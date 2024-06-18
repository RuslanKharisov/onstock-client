export type UserId = string | undefined
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
  id: UserId
  email: string
  role?: Role
  emailVerified?: Date | null
  name?: string | null
  image?: string | null
  password?: string | null
}

export type SessionEntity = {
  user: {
    id: UserId
    email: string
    role: Role
    name?: string | null
    image?: string | undefined
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
