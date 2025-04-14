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
    supplierType?: SupplierType
    api: Api
}

interface Api {
    url: string
    token: string
}

interface SupplierType {
    id: number
    name: string
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

interface TTariff {
    id: number
    name: string
    maxProducts: number
    pricePerUnit: number
}