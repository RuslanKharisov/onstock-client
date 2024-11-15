export type UserId = string | undefined
// export type Role = "ADMIN" | "SUPPLIER" | "USER"

// export const ROLES: Record<Role, Role> = {
//   ADMIN: "ADMIN",
//   SUPPLIER: "SUPPLIER",
//   USER: "USER",
// }

export type CreateUserCommand = {
  email: string
  name: string
  password?: string
}

export type UserEntity = {
  id: string
  name?: string
  email: string
  image?: string | null
  role: string
  emailVerified?: Date | null
  password?: string | null
  isTwoFactorEnabled: boolean
}

// export type SessionEntity = {
//   user?: {
//     id?: string
//     name?: string | null
//     email?: string | null
//     image?: string | null
//     role?: Role
//   }
//   expires: string
// }

// export type SessionUser = {
//   id?: string
//   name?: string | null
//   email?: string | null
//   image?: string | null
//   role?: Role
// }

// Projetions

export type Profile = {
  id?: string
  name?: string
  email?: string
  image?: string | null
  role?: string
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
