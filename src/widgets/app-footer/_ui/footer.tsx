import { Socials } from "@/widgets/socials"
import { socialsData } from "@/widgets/socials/_vm/constans"
import { Logo } from "@/shared/ui/logo"

const Footer = () => {

  return (
    <footer className="w-full py-8">
      <div className="container">
        <section className="flex flex-col items-center justify-between gap-y-3 lg:flex-row ">
          <Logo/>            
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
