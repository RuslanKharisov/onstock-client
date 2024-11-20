"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { casesData } from "@/widgets/prising-cards/_model/mock-data"
import { PrisingCards } from "@/widgets/prising-cards/prising-cards"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select"
import { useState } from "react"
import { Separator } from "@/shared/ui/separator"
import { Bill } from "@/widgets/bill"

type TTariff = {
  id: string
  name: string
  maxProducts: number
  pricePerUnit: number
}

const tariffs: TTariff[] = [
  { id: '1', name: "TARIFF_10", maxProducts: 10, pricePerUnit: 0.0 },
  { id: '2', name: "TARIFF_100", maxProducts: 100, pricePerUnit: 10.0 },
  { id: '3', name: "TARIFF_500", maxProducts: 500, pricePerUnit: 10.0 },
  { id: '4', name: "TARIFF_1000", maxProducts: 1000, pricePerUnit: 9.0 },
  { id: '5', name: "TARIFF_2 000", maxProducts: 2000, pricePerUnit: 9.0 },
  { id: '6', name: "TARIFF_3 000", maxProducts: 3000, pricePerUnit: 9.0 },
  { id: '7', name: "TARIFF_4 000", maxProducts: 4000, pricePerUnit: 9.0 },
  { id: '8', name: "TARIFF_5 000", maxProducts: 5000, pricePerUnit: 8.0 },
  { id: '9', name: "TARIFF_10 000", maxProducts: 10000, pricePerUnit: 7.0 },
]

export type TBillItem = {
  id: string
  name: string
  description?: string
  quantity?: number
  price: number
}

export const billDetails: TBillItem = { 
  id: '2',
  name: "TARIFF_100",
  description:'Лимит максимольного количества униклальных таваров', 
  quantity: 1, 
  price: 10.0 
}

const Prising = () => {

  const [selectedTariff, setSelectedTariff] = useState<number | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const handleTariffChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTariff(parseInt(event.target.value));
  }

  const handleUpdateTariff = () => {
    // if (selectedTariff) {
    //   updateSupplierTariff(selectedTariff) // Вызываем функцию обновления тарифа
    //     .then(() => {
    //       setSuccess("Тариф обновлен, ожидается оплата.");
    //     })
    //     .catch(() => setError("Ошибка при обновлении тарифа"));
    // }
  };

  return (
    <main className="container">
      <div className="py-5 text-center">
        <h1 className="">
          На этой странице вы можете обновить свои данные и данные компании.
        </h1>
      </div>
      <Separator />
      <div className="flex flex-col justify-center items-center py-10">
        {/* <PrisingCards CaseList={casesData} /> */}

        <Card className="w-[315px] md:w-2/3">
          <CardHeader>
            <h2 className="text-center text-lg font-bold">Выберите тариф</h2>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {tariffs.map((tariff) => (
                  <SelectItem 
                  key={tariff.id} 
                  value={tariff.id}
                  className="text-xs sm:text-sm"
                  >
                    {tariff.name} — {tariff.maxProducts} продуктов, цена за
                    единицу: {tariff.pricePerUnit} руб.
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleUpdateTariff} className="mt-4">
              Применить тариф
            </Button>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
          </CardContent>
        </Card>
      </div>
      <div className="mx-auto w-2/3 py-10">
        <Bill billDetails={billDetails}/>
      </div>
    </main>
  )
}

export default Prising
