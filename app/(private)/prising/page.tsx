"use client"

import { Card, CardContent, CardHeader } from "@/shared/ui/card"

const Prising = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center pt-16">
        <Card className="w-full">
          <CardHeader>
            <h1 className="text-center text-lg font-bold">
              Подключить свой скдад к поиску
            </h1>
          </CardHeader>
          <CardContent>
            <p>Склад подключается посредством API.</p>
            <p>
              После настройки подключения аглоритм поиска будет опрашивать и ваш
              скдад на наличие товара.
            </p>
            <p>
              По вопросу подключения пришите на телеграмм, который указан в
              подвале сайта.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Prising
