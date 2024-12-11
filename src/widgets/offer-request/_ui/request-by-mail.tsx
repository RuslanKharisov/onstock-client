import { Button } from "@/shared/ui/button"

const RequestByMail = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <p className="font-semibold">
        Запросить счет на расширение тарифа можно отправив запрос на почту.
      </p>
      <Button variant="secondary" size="sm" className="w-full md:w-fit " >
        <a
          href="mailto:ruslan.kharisov@gmail.com"
          className="ms-1 font-medium "
        >
          Написать на почту
        </a>
      </Button>
    </div>
  )
}

export { RequestByMail }
