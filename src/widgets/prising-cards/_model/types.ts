export type PriceCase = {
  id: number
  title: string
  description: string
  price: string
  services: Servise[]
}

type Servise = {
  name: string
  value: string
}