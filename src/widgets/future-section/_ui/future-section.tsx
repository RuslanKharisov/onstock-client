import { features } from "../_vm/constans"
import FutureItem from "./future-item"

const FutureSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mb-8 max-w-screen-md lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Мы стремимся помочь найти оборудование для промышленности в наличии.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 sm:text-xl">
            Преимущества к которым мы стремимся, это предоставить возможность
            потребителю оперативно найти оборудование для автоматизации, КИП,
            комплектующие для систем аналитического контроля, электроприводное
            оборудование, редукторы, оборудование для систем электроснабжения,
            ...) в наличии в случаях, когда время - деньги.
          </p>
        </div>

        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {features.map((item, idx) => (
            <FutureItem
              key={idx}
              title={item.title}
              text={item.text}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { FutureSection }
