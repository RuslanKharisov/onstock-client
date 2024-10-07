import { LogoIcon } from "@/shared/ui/logo-icon"

const Bill = () => {
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
      <table className="mb-10 w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">№ п.п</th>
            <th className="px-6 py-3">Наименование</th>
            <th className="px-6 py-3">Описание</th>
            <th className="px-6 py-3">Количество, шт</th>
            <th className="px-6 py-3">Цена за единицу, руб.</th>
            <th className="px-6 py-3">Сумма, руб.</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">Apple MacBook Pro 17"</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">10</td>
            <td className="px-6 py-4">1900</td>
            <td className="px-6 py-4">19000</td>
          </tr>
          <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">Apple MacBook Pro 17"</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">10</td>
            <td className="px-6 py-4">1900</td>
            <td className="px-6 py-4">19000</td>
          </tr>
          <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
            <td className="px-6 py-4">1</td>
            <td className="px-6 py-4">Apple MacBook Pro 17"</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">10</td>
            <td className="px-6 py-4">1900</td>
            <td className="px-6 py-4">19000</td>
          </tr>
        </tbody>
      </table>
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
