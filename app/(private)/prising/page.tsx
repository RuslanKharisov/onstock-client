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
import { LightBill } from "@/widgets/bill"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem } from "@/shared/ui/form"
import { RequestByMail } from "@/widgets/offer-request"

export type TTariff = {
  id: number
  name: string
  maxProducts: number
  pricePerUnit: number
}

interface FormData {
  tarifId: string
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

const Prising = () => {
  const [selectedTariff, setSelectedTariff] = useState<TTariff | undefined>(
    undefined,
  )

  const form = useForm<FormData>()

  function findById<T extends { id: number | string }>(
    array: T[],
    id: number | string,
  ): T | undefined {
    return array.find((el) => String(el.id) === String(id))
  }

  const onSubmit = (data: FormData) => {
    const { tarifId } = data
    const selectedTariff = findById(tariffs, tarifId)

    if (selectedTariff) {
      setSelectedTariff(selectedTariff)
    }
  }

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center py-3">
        <Card className="w-full">
          <CardHeader>
            <h2 className="text-center text-lg font-bold">Выберите тариф</h2>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="tarifId"
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
                          {tariffs?.map((tariff) => (
                            <SelectItem
                              key={tariff.id}
                              value={tariff.id.toString()}
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
                <Button size="sm" type="submit" className="mt-4 w-full sm:w-fit">
                  Рассчитать стоимость
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <RequestByMail />
      <LightBill billDetails={selectedTariff} />
    </div>
  )
}

export default Prising
