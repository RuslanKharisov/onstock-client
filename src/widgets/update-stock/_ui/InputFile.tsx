"use client"

import { createProductAction } from "@/features/products-list/actions";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Product } from "@prisma/client";
import React, { useState }  from "react";
import * as XLSX from "xlsx";

export interface ProductsStock {
  Name: string;
  Index: number;
}

export function InputFile({supplier}:{supplier: getSupplier}) {
  const [stockData, setStockData] = useState<addOrUpdateProductCommand[]>([]);
  console.log("🚀 ~ InputFile ~ products:", stockData)

  let revalidatePagePath="/personal-stock/"

  function handleFileUpload(e:any) {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[1];
      const sheet = workbook.Sheets[sheetName];
      const parsedData:addOrUpdateProductCommand[] = XLSX.utils.sheet_to_json(sheet);
      setStockData(parsedData);
  }
}

function hadleClick() {
    stockData.map((product:addOrUpdateProductCommand) => {
       const data = {
        sku: product.sku,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        supplierId: supplier.id
    }
    createProductAction(data, revalidatePagePath);

})
}

  return (
    <div className="grid w-full max-w-sm items-center gap-5">
      <Label htmlFor="picture">формат: xlsx</Label>
      <Input id="exelfile" type="file" onChange={handleFileUpload} className=" duration-300 hover:bg-slate-300"/>
      <Button variant="default" onClick={hadleClick} >Добавить товары из файла</Button>
    </div>
  );
}
