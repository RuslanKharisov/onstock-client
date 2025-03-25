export type Role = 'ADMIN' | 'SUPPLIER' | 'USER';

export type UsersListElementWithRelations = {
    id: string,
    email: string,
    role: Role,
    name: string,
    emailVerified: Date,
    image: string | null,
    isTwoFactorEnabled: boolean,
    Supplier: Supplier
}