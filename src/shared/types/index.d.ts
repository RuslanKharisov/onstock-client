interface Filters {
    [key: string]: string | number | boolean;
}

interface Supplier {
    id: number
    name: string
    email: string
    siteUrl: string | null
    userId: string
    phoneWork?: string
    phoneMobile?: string
    telegramAccount?: string
    whatsappNumber?: string
    vkProfile?: string
    logoUrl?: string
    addressId: number
    address: Address
    subscription: Subscription
    type?: SupplierType
}


interface Product {
    id: string;
    sku: string;
    name: string;
    description: string;
    categoryId: number;
    manufacturerId: number;
    manufacturer: Manufacturer;
}


interface MetaData {
    total: number;
    page: number;
    currentPage: number;
    lastPage: number;
    next: number | null;
    prev: number | null;
};