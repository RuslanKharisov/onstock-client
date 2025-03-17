import { Filters } from "@/shared/types"

export interface ManufactorerListQueryDto {
    page: number
    perPage: number
    filters?: Filters
}
