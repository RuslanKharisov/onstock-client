"use client"

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

export function InputFile() {
  const [data, setData] = useState<Product[]>([]);
  console.log("🚀 ~ InputFile ~ products:", data)

  function handleFileUpload(e:any) {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[1];
      const sheet = workbook.Sheets[sheetName];
      const parsedData:Product[] = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
  }
}

function hadleClick() {
    data.map((product) => console.log(product))
}

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">файл Exel</Label>
      <Input id="exelfile" type="file" onChange={handleFileUpload} />
      <Button variant="outline" onClick={hadleClick} >Button</Button>
    </div>
  );
}
