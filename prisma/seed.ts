import { register } from "@/features/auth/_actions/register";
import { dbClient } from "@/shared/lib/db";
import bcrypt from "bcryptjs"

const tariffs = [
  { name: 'TARIFF_10', maxProducts: 10, pricePerUnit: 0.0 }, // Бесплатный тариф
      { name: 'TARIFF_100',maxProducts: 100, pricePerUnit: 10.0 },
      { name: 'TARIFF_500',maxProducts: 500, pricePerUnit: 10.0 },
      { name: 'TARIFF_1000',maxProducts: 1000, pricePerUnit: 10.0 },
      { name: 'TARIFF_2500',maxProducts: 2500, pricePerUnit: 10.0 },
      { name: 'TARIFF_5000',maxProducts: 5000, pricePerUnit: 10.0 },
      { name: 'TARIFF_10000',maxProducts: 10000, pricePerUnit: 10.0 },
]

async function seed() {
  await dbClient.tariff.deleteMany();
  // запрос заполняет таблицу с тарифами
  await dbClient.tariff.createMany({data: tariffs})

  // Создание пользователя с ролью администратора
  const password = process.env.ADMIN_PASSWORD
  const email = process.env.ADMIN_EMAIL

  if (password && email) {
    register({
      name : 'admin',
      email: email,
      password: password,
    })
    console.log("To finish admin registration check email")
  }
}

seed().catch(e => {
  throw e;
}).finally(async () => {
  await dbClient.$disconnect();
});


