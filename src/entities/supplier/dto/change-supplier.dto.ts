
export type ChangeSupplierDto = {
  // supplier: SupplierDto
  name: string
  email: string
  siteUrl?: string
  phoneMobile?: string
  phoneWork?: string
  telegramAccount?: string
  whatsappNumber?: string
  vkProfile?: string
  logoUrl?: string

  address: AddressDto
}

// export type SupplierDto = {
// }



type AddressDto = {
  street?: string
  house?: string
  region?: string
  country?: string

  city?: CityDto
}

type CityDto = {
  id: number
  name: string
}