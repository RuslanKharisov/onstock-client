"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import React, { useState } from "react"
import * as XLSX from "xlsx"
import DownloadExcelSample from "./DownloadExcelSample"
import { useAddOrUpdateProduct } from "@/entities/stock-personal.ts/api/personal-stock.queries"
import { Supplier } from "@/entities/supplier/_domain/types"
import { addOrUpdateProductCommand } from "@/entities/producrts-list/_domain/types"

export interface ProductsStock {
  Name: string
  Index: number
}

export function UpdateFromFile({
  supplier,
  accessToken,
}: {
  supplier: Supplier
  accessToken: string
}) {
  const [error, setError] = useState<string | undefined>()
  // const [success, setSuccess] = useState<string | undefined>()
  const [stockData, setStockData] = useState<addOrUpdateProductCommand[]>([])

  const {
      mutate: addOrUpdateProduct,
      isPending,
      isSuccess,
      isError,
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

  async function handleClick() {
    for (const product of stockData) {
      const data = {
        sku: product.sku,
        name: product.name || "",
        description: product.description || "",
        quantity: product.quantity,
        supplierId: supplier?.id,
      }
      addOrUpdateProduct({ data, accessToken })
    }
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
          Добавить товары из файла
        </Button>
      </CardContent>
      <CardContent>
        {isSuccess && (
          <p className="mb-2 rounded-lg bg-green-300 px-3 py-3 text-center text-xs ">
            Успешно
          </p>
        )}
        {isError ? (
          <p className="rounded-lg bg-red-200 px-3 py-3 text-center text-xs ">
            Что-то пошло не так. 
          </p>
        ) : error ? 
         <p className="rounded-lg bg-red-200 px-3 py-3 text-center text-xs ">{error}</p> 
         : ""
        }
      </CardContent>
    </Card>
  )
}
