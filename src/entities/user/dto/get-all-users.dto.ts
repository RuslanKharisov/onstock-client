import { Role } from "../_domain/types"

export interface getAllUsersDto {
    page: number
    perPage: number
    role?: Role
}