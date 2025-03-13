import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Markdown from "react-markdown"

// Функция для загрузки Markdown-файла
async function getMarkdownContent(slug: string[]) {
  const filePath = path.join(process.cwd(), "content/docs", ...slug) + ".mdx"
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)
  return { data, content }
}

export default async function Page({
  params,
}: {
  params: { slug?: string[] }
}) {
  const { slug } = params

  // Если slug отсутствует, показываем 404
  if (!slug) notFound()

  // Загружаем Markdown-контент
  const markdownContent = await getMarkdownContent(slug)
  if (!markdownContent) notFound()

  return (
    <article className="prose max-w-none py-16 md:py-5 px-5">
      <h1>{markdownContent.data.title}</h1>
      <Markdown className="space-y-4 ">{markdownContent.content}</Markdown>
    </article>
  )
}
