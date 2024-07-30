import { PriceCase } from "./types"

export const casesData: PriceCase[] = [
  {
    id: 1,
    title: "Остатки",
    description: "Остатки на вашем складе, которые возможно кто-то ищет",
    price: "1 000",
    services: [ 
      {
        name: "Складских позиций",
        value: "до 100"
      },
    ]
  },
  {
    id: 2,
    title: "Небольшой склад",
    description: "У вас сформирован не большой скдад, который регулярно обновляется",
    price: "10 000",
    services: [
      {
        name: "Складских позиций",
        value: "до 1000"
      },
    ],
  },
  {
    id: 3,
    title: "Мега - склад",
    description: "Вы производите продукцию и на складе формируются запасы, которые вы готовы продать",
    price: "100 000",
    services: [
      {
        name: "Складских позиций",
        value: "более 1000"
      },
    ],
  },
]
