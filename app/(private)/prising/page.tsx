"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select"
import { useState } from "react"
import { Separator } from "@/shared/ui/separator"
import { LightBill } from "@/widgets/bill"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem } from "@/shared/ui/form"
import { FormEroor } from "@/shared/ui/form-error"
import { FormSuccess } from "@/shared/ui/form-success"
import { TariffSchema } from "@/entities/user/_domain/schemas"
import { z } from "zod"
import { RequestByMail } from "@/widgets/offer-request"

export type TTariff = {
  id: number
  name: string
  maxProducts: number
  pricePerUnit: number
}

const tariffs: TTariff[] = [
  { id: 1, name: "TARIFF_10", maxProducts: 10, pricePerUnit: 0.0 },
  { id: 2, name: "TARIFF_100", maxProducts: 100, pricePerUnit: 10.0 },
  { id: 3, name: "TARIFF_500", maxProducts: 500, pricePerUnit: 10.0 },
  { id: 4, name: "TARIFF_1000", maxProducts: 1000, pricePerUnit: 9.0 },
  { id: 5, name: "TARIFF_2 000", maxProducts: 2000, pricePerUnit: 9.0 },
  { id: 6, name: "TARIFF_3 000", maxProducts: 3000, pricePerUnit: 9.0 },
  { id: 7, name: "TARIFF_4 000", maxProducts: 4000, pricePerUnit: 9.0 },
  { id: 8, name: "TARIFF_5 000", maxProducts: 5000, pricePerUnit: 8.0 },
  { id: 9, name: "TARIFF_10 000", maxProducts: 10000, pricePerUnit: 7.0 },
]

export type TBillItem = {
  id: number
  name: string
  description?: string
  quantity?: number
  price: number
}

export const billDetails: TBillItem = {
  id: 2,
  name: "TARIFF_100",
  description: "Лимит максимольного количества униклальных таваров",
  quantity: 1,
  price: 10.0,
}

const Prising = () => {
  const [selectedTariff, setSelectedTariff] = useState<TTariff | undefined>(
    undefined,
  )
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  // const handleTariffChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedTariff(parseInt(event.target.value))
  // }
  console.log("🚀 ~ Prising ~ selectedTariff:", selectedTariff)

  const form = useForm({})

  const onSubmit = (values) => {
    console.log("🚀 ~ onSubmit ~ data:", values)
    const { stringifiedTariff } = values
    if (stringifiedTariff) {
      const tariff = JSON.parse(stringifiedTariff)
      console.log("🚀 ~ onSubmit ~ tariffId:", tariff)
      setSelectedTariff(tariff)
      //   updateSupplierTariff(selectedTariff) // Вызываем функцию обновления тарифа
      //     .then(() => {
      //       setSuccess("Тариф обновлен, ожидается оплата.");
      //     })
      //     .catch(() => setError("Ошибка при обновлении тарифа"));
    }
  }

  return (
    <main className="container">
      <Separator />
      <div className="flex flex-col items-center justify-center py-5">
        <Card className="w-full">
          <CardHeader>
            <h2 className="text-center text-lg font-bold">Выберите тариф</h2>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="stringifiedTariff"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Выбрать тариф из списка" />
                        </SelectTrigger>
                        <SelectContent>
                          {tariffs.map((tariff) => (
                            <SelectItem
                              key={tariff.id}
                              value={JSON.stringify(tariff)}
                              className="text-xs sm:text-sm"
                            >
                              {tariff.name} — {tariff.maxProducts} продуктов,
                              цена за единицу: {tariff.pricePerUnit} руб.
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                ></FormField>
                <FormEroor message={error} />
                <FormSuccess message={success} />
                <Button size="sm" type="submit" className="mt-4">
                  Рассчитать стоимость
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
        <RequestByMail />
      <LightBill billDetails={selectedTariff} />
    </main>
  )
}

export default Prising
