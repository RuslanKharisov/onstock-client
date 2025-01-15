
import { ImageWithCTAButton } from "@/widgets/cta-section"
import { FutureSection } from "@/widgets/future-section/_ui/future-section"
import { HeroSection } from "@/widgets/hero-section/hero-section"

export default async function Home() {
  return (
    <div className="mt-[70px] md:mt-0">
      <HeroSection/>
      <ImageWithCTAButton/>
      <FutureSection/>
    </div>
  )
}
