import { PostCategory, PostType } from "../_domain/types"

const postContent =
  `
Добро пожаловать на платформу, где собраны лучшие предложения от поставщиков оборудования для автоматизации, измерения и управления. Мы предлагаем обширный каталог продукции: ПЛК, датчики, преобразователи частоты, электроприводы, системы управления и другое оборудование для производственных нужд.

Наш сервис создан для удобства профессионалов, работающих в сфере промышленной автоматизации, проектирования и эксплуатации систем АСУ ТП. 

Вы можете:

- **Быстро найти оборудование** благодаря удобной системе фильтрации.
- **Сравнить товары** разных производителей по характеристикам и цене.
- **Получить актуальную информацию** о наличии оборудования на складах.
- **Напрямую связаться с поставщиками** и обсудить условия покупки.

## Почему выбирают нас?

- **Обширная база поставщиков и производителей.**
- **Проверенные товары с гарантией качества и сертификацией.**
- **Удобный интерфейс и быстрый доступ к информации.**

## Ищете оборудование для автоматизации?

Наш сайт поможет вам найти всё необходимое для вашего проекта. Регистрируйтесь, исследуйте наш каталог и получайте лучшие предложения от ведущих поставщиков!

**Найти в наличии — проще, чем кажется, с нашей платформой!**
`


const postCategory: PostCategory[] = [
  {
    id: "e331aacb-ca47-4791-b67a-c2d0bbcf64c1",
    title: "Новости",
    slug: "Novisti",
  },
  {
    id: "ac31c0e4-fd10-4fab-87dc-e1ca6f8ce60d",
    title: "Склад",
    slug: "Sklad",
  },
]

export const posts: PostType[] = [
  {
    id: "3deb57ce-a848-486e-8718-5e1d0cd4e673",
    title:
      "АСУ ТП, КИП и А, Электроприводы и Электрооборудование на одном сайте",
    slug: "Oborudovanie-ASU-TP-KIP-i-A-Elektroprivody-i-Elektrooborudovanie-na-odnom-saite",
    metadata: {
      categories: postCategory,
      image: {
        imgix_url:
          "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
      },
      content: postContent,
      author: {
        title: "Admin",
        metadata: {
          image: {
            imgix_url:
              "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
          },
        },
      },
      published_date: "17/01/2025",
    },
  },
]

export const post: PostType = {
  id: "3deb57ce-a848-486e-8718-5e1d0cd4e673",
  title:
    "АСУ ТП, КИП и А, Электроприводы и Электрооборудование на одном сайте",
  slug: "Oborudovanie-ASU-TP-KIP-i-A-Elektroprivody-i-Elektrooborudovanie-na-odnom-saite",
  metadata: {
    categories: postCategory,
    image: {
      imgix_url:
        "/images/equipment_warehouse.webp",
    },
    content: postContent,
    author: {
      title: "Admin",
      metadata: {
        image: {
          imgix_url:
            "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
        },
      },
    },
    published_date: "17-01-2025",
  },
}
