import { casesData } from "@/widgets/prising-cards/_model/mock-data"
import { PrisingCards } from "@/widgets/prising-cards/prising-cards"

const Prising = () => {
  return <PrisingCards CaseList={casesData} />
}

export default Prising
