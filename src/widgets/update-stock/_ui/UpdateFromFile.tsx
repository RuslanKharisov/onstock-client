"use client"

import { createProductAction } from "@/features/products-list/actions"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Product } from "@prisma/client"
import React, { useState } from "react"
import * as XLSX from "xlsx"
import DownloadExcelSample from "./DownloadExcelSample"

export interface ProductsStock {
  Name: string
  Index: number
}

export function UpdateFromFile({ supplier }: { supplier: getSupplier }) {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  
  const [stockData, setStockData] = useState<addOrUpdateProductCommand[]>([])
  let revalidatePagePath = "/personal-stock/"

  function handleFileUpload(e: any) {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = (e) => {
      const data = e.target?.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[1]
      const sheet = workbook.Sheets[sheetName]
      const parsedData: addOrUpdateProductCommand[] =
        XLSX.utils.sheet_to_json(sheet)
      setStockData(parsedData)
    }
  }

  async function handleClick() {
    for (const product of stockData) {
      const data = {
        sku: product.sku,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        supplierId: supplier.id,
      };
  
      try {
        const result = await createProductAction(data, revalidatePagePath);
  
        if (result?.error) {
          console.log(result.error);
          setError(result.error);
          return; 
        }
  
        if (result.success) {
          console.log(result.success);
          setSuccess(result.success);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred: " + (error as Error).message);
        return;
      }
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
        <Button variant="default" onClick={handleClick}>
          Добавить товары из файла
        </Button>
      </CardContent>
      <CardContent>
        { success && <h2 className="text-center bg-green-300 text-xs rounded-lg px-3 py-3 mb-2 ">{success}</h2> }
        { error && <h2 className="text-center bg-red-200 text-xs rounded-lg px-3 py-3 ">{error}</h2> }
      </CardContent>
    </Card>
  )
}
