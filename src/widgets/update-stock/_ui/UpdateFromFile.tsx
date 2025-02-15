"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import React, { useState } from "react"
import * as XLSX from "xlsx"
import DownloadExcelSample from "./DownloadExcelSample"
import { useAddOrUpdateProduct } from "@/entities/stock-personal.ts/api/personal-stock.queries"
import { addOrUpdateProductCommand } from "@/entities/producrts-list/_domain/types"
import { Spinner } from "@/shared/ui/spinner"

export interface ProductsStock {
  Name: string
  Index: number
}

export function UpdateFromFile({
  accessToken,
  limit,
}: {
  accessToken: string
  limit: number | null
}) {
  const [error, setError] = useState<string | undefined>()
  const [stockData, setStockData] = useState<addOrUpdateProductCommand[]>([])
  console.log("UpdateFromFile limit ==> ", limit)

  const {
    mutate: addOrUpdateProduct,
    isPending,
    data,
    isError,
    error: resError,
  } = useAddOrUpdateProduct()

  function handleFileUpload(e: any) {
    const file = e.target.files[0]

    if (
      !file ||
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setError("Пожалуйста, загрузите файл формата .xlsx")
      return
    }

    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.onload = (e) => {
      const data = e.target?.result
      try {
        const workbook = XLSX.read(data, { type: "binary" })

        // Проверяем, есть ли нужный лист в файле
        const sheetName = workbook.SheetNames[1] // Убедитесь, что нужный лист по индексу
        if (!sheetName) {
          setError("Лист с данными не найден в файле.")
          return
        }

        const sheet = workbook.Sheets[sheetName]
        const parsedData: addOrUpdateProductCommand[] =
          XLSX.utils.sheet_to_json(sheet)

        // Проверяем, есть ли данные в файле
        if (parsedData.length === 0) {
          setError("Файл не содержит данных.")
          return
        }

        setStockData(parsedData)
        setError(undefined) // Очистка ошибки, если данные корректные
      } catch {
        setError("Ошибка при чтении файла.")
      }
    }
  }

  function parseDate(dateString: string) {
    if (typeof dateString !== "string") {
      setError("Поле даты должно быть текстовое")
      return
    }
    const dateMatch = dateString.match(
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-.](0?[1-9]|1[012])[\/\-.](\d{4})$/,
    )

    if (!dateMatch) {
      setError(" Проверьте даты, формат DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY ")
      return
    }

    const day = Number(dateMatch[1])
    const month = Number(dateMatch[2])
    const year = Number(dateMatch[3])

    // Если год состоит из 2 цифр, добавляем 2000 для получения полного года
    const fullYear = year < 100 ? year + 2000 : year

    // Создаем объект Date (месяцы начинаются с 0)
    return new Date(fullYear, month - 1, day)
  }

  async function handleClick() {
    if (limit === null) {
      setError("Не удалось получить лимит товаров")
      return
    }

    const productsToUpload = stockData.slice(0, limit).map((product) => ({
      sku: product.sku,
      name: product.name || "",
      category: product.category || undefined,
      description: product.description || "",
      quantity: product.quantity,
      manufacturer: product.manufacturer || undefined,
      newDeliveryQty1:
        typeof product.newdelivery_qty_1 === "number"
          ? product.newdelivery_qty_1
          : undefined,
      newDeliveryDate1: product.newdelivery_date_1
        ? parseDate(product.newdelivery_date_1)
        : undefined,
      newDeliveryQty2:
        typeof product.newdelivery_qty_2 === "number"
          ? product.newdelivery_qty_2
          : undefined,
      newDeliveryDate2: product.newdelivery_date_2
        ? parseDate(product.newdelivery_date_2)
        : undefined,
    }))

    if (stockData.length > limit) {
      setError("Часть товаров не загружена из-за ограничения по лимиту.")
    }

    addOrUpdateProduct({ data: productsToUpload, accessToken })
  }

  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>Импорт склада из файла Excel</CardTitle>
        <DownloadExcelSample />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-8">
        <Label htmlFor="excelfile">Загрузить файл с диска:</Label>
        <Input
          id="excelfile"
          type="file"
          accept="xlsx"
          onChange={handleFileUpload}
          className=" duration-300 hover:bg-slate-300"
        />
        <Button variant="default" onClick={handleClick} disabled={isPending}>
          {isPending ? <Spinner /> : "Добавить товары из файла"}
        </Button>
      </CardContent>
      <CardContent>
        {data?.messages?.[0]?.property === "ok" && (
          <p className="mb-2 rounded-lg bg-green-300 px-3 py-3 text-center text-xs ">
            {data?.messages?.[0]?.message}
          </p>
        )}
        {error && (
          <p className="mb-2 rounded-lg bg-red-200 px-3 py-3 text-center text-xs ">
            {error}
          </p>
        )}
        {data?.messages?.[0]?.property === "warning" ? (
          <p className="rounded-lg bg-red-200 px-3 py-3 text-center text-xs ">
            {data?.messages?.[0]?.message}
          </p>
        ) : isError ? (
          <p className="rounded-lg bg-red-200 px-3 py-3 text-center text-xs ">
            {resError.message}
          </p>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  )
}
