import Link from "next/link"
import { LogoIcon } from "@/shared/ui/logo-icon"
import { Socials } from "@/widgets/socials"
import { socialsData } from "@/widgets/socials/_vm/constans"

const Footer = () => {

  return (
    <footer className="w-full py-8">
      <div className="container">
        <section className="flex flex-col items-center justify-between gap-y-3 lg:flex-row ">
          <Link className="space-x-2" href="/">
            <span className="inline-block font-bold">
              <LogoIcon className="mr-3 h-6 w-6" />
            </span>
            Промышленный склад
          </Link>
          <Socials socialsData={socialsData} />
        </section>
        <div className=" my-8 flex flex-col items-center gap-y-5 md:my-2">
          <p className="text-center text-xs">
            © 2024{" "}
            <a
              href="https://www.barbarisstudio.ru/"
              className="hover:underline"
            >
              Studio Barbaris™
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
