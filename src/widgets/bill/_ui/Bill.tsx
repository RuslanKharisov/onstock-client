import { LogoIcon } from "@/shared/ui/logo-icon"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

const Bill = ({ billDetails }: { billDetails: TTariff }) => {
  if (!billDetails) return null

  const { name } = billDetails

  // Проверяем, есть ли данные
  if (!billDetails || !billDetails.name) return null

  const total = billDetails.pricePerUnit
    ? billDetails.maxProducts * billDetails.pricePerUnit
    : 0

  return (
    <div className="py-8">
      <div className="flex justify-center">
        <div className="mb-3 flex w-full flex-col justify-center">
          <div className="mb-3 flex items-center justify-center">
            <LogoIcon className="mr-3 h-6 w-6" />
            <h1 className="m-0">
              Общество с ограниченной ответственностью &quot;Название&quot;
            </h1>
          </div>
          <div>Адрес</div>
          <ul className="flex">
            <li className="font-semibold">
              ИНН: <span className="font-light">инн</span>{" "}
            </li>
            <li className="font-semibold">
              КПП: <span className="font-light">кпп</span>{" "}
            </li>
            <li className="font-semibold">
              ОКПО: <span className="font-light">окпо</span>{" "}
            </li>
            <li className="font-semibold">
              ОГРН: <span className="font-light">огрн</span>{" "}
            </li>
          </ul>
          <div className="font-semibold">
            Email: <span className="font-light">емайл</span>
          </div>
          <div className="font-semibold">
            Сайт: <span className="font-light">урл сайта</span>
          </div>
        </div>
      </div>
      <div className="mb-2 border-2 border-primary"></div>
      <div className="mb-5 flex justify-between text-sm">
        <i className="KP-counter">
          <b>КП003</b>
        </i>
        <i className="">Группа компаний</i>
      </div>
      <div className="flex justify-between text-sm">
        <i className="date">
          <b>От:</b>
        </i>
        <i className="ferrum">
          <b>«FerrumFormat»</b>
        </i>
      </div>
      <div className="flex justify-end text-sm">
        <div>
          <i>
            <b>Кому:</b>
          </i>
        </div>
        <div className="client">ООО «фирма»</div>
      </div>
      <div className="mb-5 flex justify-center">
        <b>Счет договор</b>
      </div>
      <div className="mb-5">
        В ответ на Ваш запрос ООО «фирма» готово осуществить поставку изделий
        согласно спецификации:
      </div>
      <Table className="mb-10 w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <TableHeader className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <TableRow>
            <TableHead className="px-6 py-3">№ п.п</TableHead>
            <TableHead className="px-6 py-3">Тариф</TableHead>
            <TableHead className="px-6 py-3">
              Лимит униклальных таваров
            </TableHead>
            <TableHead className="px-6 py-3">Цена за единицу, руб.</TableHead>
            <TableHead className="px-6 py-3">Сумма, руб.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
            <TableCell className="px-6 py-4">1</TableCell>
            <TableCell className="px-6 py-4 text-sm">{name}</TableCell>
            <TableCell className="px-6 py-4">
              {" "}
              {billDetails.maxProducts}
            </TableCell>
            <TableCell className="px-6 py-4">
              {billDetails.pricePerUnit}
            </TableCell>
            <TableCell className="px-6 py-4">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="">
        <ul className="mb-5">
          <li>
            <p className="font-semibold">
              Условия оплаты: <span className="font-light">100% аванс.</span>{" "}
            </p>
          </li>
          <li>
            <p className="font-semibold">
              Срок действия:{" "}
              <span className="font-light">
                1 месяц с даты поступления денежных средств.
              </span>{" "}
            </p>
          </li>
        </ul>
      </div>
      <div className="mb-2 border-2 border-primary"></div>
      <div className="footer margin-top-1 flex justify-between">
        <div className="KP-counter">КП003</div>
        <div className="flex justify-end">
          <div>Кому:</div>
          <div className="client margin-left-1 ">ООО «Покупатель»</div>
          <div className="margin-left-015">- Покупатель</div>
        </div>
        <div className="">ООО «Фирма» - Поставщик</div>
      </div>
    </div>
  )
}

export { Bill }
