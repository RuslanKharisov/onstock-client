import { LogoIcon } from "@/shared/ui/logo-icon"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { TBillItem } from "app/(private)/prising/page"



const Bill = ({ billDetails }: { billDetails: TBillItem }) => {
  console.log("🚀 ~ Bill ~ billDitails:", billDetails)
  const {name} = billDetails

  // Проверяем, есть ли данные
  if (!billDetails || !billDetails.name) return null;

  const total = billDetails.quantity ? billDetails.quantity * billDetails.price : 0;

  return (
    <div className="py-10">
      <div className="flex justify-center p-5">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <h1>
              <span className="inline-block font-bold">
                <LogoIcon className="mr-3 h-6 w-6" />
              </span>
              Общество с ограниченной ответственностью "АСК"
            </h1>
          </div>
          <div>420087, Казань, ул. Скрябина, д. 8, литера Д офис 3.07</div>
          <ul className="flex">
            <li className="font-semibold">
              ИНН: <span className="font-light">1660273292.</span>{" "}
            </li>
            <li className="font-semibold">
              КПП: <span className="font-light">1660273292.</span>{" "}
            </li>
            <li className="font-semibold">
              ОКПО: <span className="font-light">1660273292.</span>{" "}
            </li>
            <li className="font-semibold">
              ОГРН: <span className="font-light">1660273292.</span>{" "}
            </li>
          </ul>          
          <div className="font-semibold">
          Email: <span className="font-light">info@asktat.ru</span> 
          </div>
          <div className="font-semibold">
            Сайт: <span className="font-light">https://asktat.ru/</span> 
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
        <div className="client">ООО «КИРОС»</div>
      </div>
      <div className="mb-5 flex justify-center">
        <b>Коммерческое предложение</b>
      </div>
      <div className="mb-5">
        В ответ на Ваш запрос ООО «АСК» готово осуществить поставку изделий
        согласно спецификации:
      </div>
      <Table className="mb-10 w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <TableHeader className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <TableRow>
            <TableHead className="px-6 py-3">№ п.п</TableHead>
            <TableHead className="px-6 py-3">Наименование</TableHead>
            <TableHead className="px-6 py-3">Описание</TableHead>
            <TableHead className="px-6 py-3">Количество, шт</TableHead>
            <TableHead className="px-6 py-3">Цена за единицу, руб.</TableHead>
            <TableHead className="px-6 py-3">Сумма, руб.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
            <TableCell className="px-6 py-4">1</TableCell>
            <TableCell className="px-6 py-4 text-sm">{name}</TableCell>
            <TableCell className="px-6 py-4">{billDetails.description}</TableCell>
            <TableCell className="px-6 py-4">{billDetails.quantity}</TableCell>
            <TableCell className="px-6 py-4">{billDetails.price}</TableCell>
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
              Доставка: <span className="font-light">Включена.</span>{" "}
            </p>
          </li>
          <li>
            <p className="font-semibold">
              Срок поставки:{" "}
              <span className="font-light">
                14 календарных дней после оплаты, без учета логистики.
              </span>{" "}
            </p>
          </li>
          <li>
            <p className="font-semibold">
              Срок действия КП:{" "}
              <span className="font-light">До 19.09.2024.</span>{" "}
            </p>
          </li>
          <li>
            <p className="font-semibold">
              Контактное лицо:{" "}
              <span className="font-light">
                Иван Иванов, тел.: +7 (123) 456 78 91.
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
        <div className="">ООО «АСК» - Поставщик</div>
      </div>
    </div>
  )
}

export { Bill }
