import { casesData } from "@/widgets/prising-cards/_model/mock-data"
import { PrisingCards } from "@/widgets/prising-cards/prising-cards"

const Prising = () => {
  return (
    <section className="">
      <div className="mx-auto container px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
          <h1 className="mb-8">
            Продай складские запасы быстро
          </h1>
          <p className="mb-4 text-gray-500 dark:text-gray-400 sm:text-xl">
            Загрузи складские запасы, неликвид, снятое с производства
            оборудование. Прямо сейчас его кто-то ищет для ремонта, замены и
            запуска оборудования в работу.
          </p>
          <p className="mb-6  text-gray-500 dark:text-gray-400 sm:text-xl">
            Выбирай наиболее подходящий тариф.
          </p>
        </div>
        <PrisingCards CaseList={casesData} />
      </div>
    </section>
  )
}

export default Prising
