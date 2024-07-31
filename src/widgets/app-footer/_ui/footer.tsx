"use client"

import Link from "next/link"
import Image from "next/image"
import { LogoIcon } from "@/shared/ui/logo-icon"

const Footer = () => (
  <footer className="w-full py-8">
    <div className="container">
      <section className="flex flex-col items-center justify-between gap-y-3 lg:flex-row ">
        <Link className="space-x-2" href="/">
          <span className="inline-block font-bold">
            <LogoIcon className="mr-3 h-6 w-6" />
          </span>
          Промышленный склад
        </Link>
        <div className="flex space-x-6">
          <a href="#" className="">
            <Image
              src={"/images/telegram.svg"}
              priority
              width={32}
              height={32}
              alt="logoImage"
            />
          </a>
          <a href="#" className="">
            <Image
              src={"/images/whatsapp.svg"}
              priority
              width={32}
              height={32}
              alt="logoImage"
            />
          </a>
        </div>
      </section>
      <div className=" my-8 flex flex-col items-center gap-y-5 md:my-2">
        <p className="text-center text-xs">
          © 2024{" "}
          <a href="https://studiobarbaris.com" className="hover:underline">
            Studio Barbaris™
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
)

export { Footer }
