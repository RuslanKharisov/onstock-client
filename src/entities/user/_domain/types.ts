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
  id: string
  name?: string | null
  email: string
  image?: string | null
  role: Role
  emailVerified?: Date | null
  password?: string | null
  isTwoFactorEnabled: boolean
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
  email: string
  name?: string | null
  image?: string | null
}

export type VerificationToken = {
  id: string
  token: string
  email: string
  expires: Date
}

export type PasswordResetToken = {
  id: string
  token: string
  email: string
  expires: Date
}
