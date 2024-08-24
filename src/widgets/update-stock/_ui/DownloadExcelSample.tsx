import { Button } from "@/shared/ui/button"

const DownloadExcelSample = () => {
  
  return (
    <a
        href="/files/example.xlsx"
        download="example.xlsx"
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="link">Скачать шаблон файла</Button>
      </a>
  )
}

export default DownloadExcelSample
