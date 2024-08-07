import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { cn } from "@/shared/ui/utils"
import { BellRing, Check, RussianRuble } from "lucide-react"
import { PriceCase } from "./_model/types"
import { useMemo } from "react"
import { Item } from "@radix-ui/react-dropdown-menu"

export const PrisingCards = ({ CaseList }: { CaseList: PriceCase[] }) => {
  return (
    <div className="grid justify-center gap-3 md:grid-cols-2 lg:grid-cols-3 lg:space-y-0 xl:gap-10">
      {CaseList.map((caseItem, index) => (
        <Card className="flex flex-wrap max-w-[380px] flex-col" key={index}>
          <CardHeader className="text-center">
            <CardTitle className="mb-3">{caseItem.title}</CardTitle>
            <CardDescription className="min-h-32  text-gray-500 dark:text-gray-400 sm:text-lg">
              {caseItem.description}.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid flex-grow gap-4">
            <div className="flex items-center justify-center">
              <RussianRuble
                size={36}
                strokeWidth={3}
                className="text-primary"
              />
              <span className="mr-2 text-4xl font-extrabold">
                {caseItem.price}
              </span>
              <span className="text-foreground">/месяц</span>
            </div>
            <ul>
              {caseItem.services.map((item, index) => (
                <li
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span>
                    <Check size={20} className="text-primary" />
                  </span>
                  <p className=" leading-none">
                    {item.name} :
                    <span className="text-lg font-bold"> {item.value} </span>
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-5">
            <Button className="w-full">
              <Check className="mr-2 h-4 w-4" /> Выбрать
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
