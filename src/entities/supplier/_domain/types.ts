export type PaginatedSuppliersList = {
  data: Supplier[];
  meta: MetaData
}

type Subscription = {
  id: number
  supplierId: number
  tariffId: number
  startDate: Date
  endDate: Date
  tariff: Tariff
}

type SupplierType = "SUPPLIER" | "SI"

type Tariff = {
  id: number
  name: string
  maxProducts: number
  pricePerUnit: number
}

type Country = {
  id: number
  name: string
  name_en: string
}

type Region = {
  id: number
  name: string
  label: string
  fullname: string
  name_en: string
  countryId: number
  country: Country
}

type City = {
  id: number
  name: string
  label: string
  zip: number
  regionId: number
  region: Region
}

type Address = {
  id: number
  street: string
  house: string
  cityId: number
  city: City
}
