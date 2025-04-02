import { Button } from "@/shared/ui/button"

const RequestByMail = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <Button variant="secondary" size="sm" className="w-full md:w-fit ">
        <a
          href="mailto:ruslan.kharisov@gmail.com"
          className="ms-1 font-medium "
        >
          Узнать подробности
        </a>
      </Button>
    </div>
  )
}

export { RequestByMail }
