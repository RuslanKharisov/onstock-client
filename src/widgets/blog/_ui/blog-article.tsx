import Markdown from "react-markdown"

import { post } from "@/entities/post/_vm/moc-data"

export async function BlogArticle({
  className,
}: {
  query?: any
  className?: string
  status?: "draft" | "published" | "any"
}) {
  return (
    <div className={className}>
      <section className="container m-auto grid items-center py-8">
        <div className="relative m-auto flex max-w-4xl flex-col items-start justify-center gap-8">
          <h2 className="mb-4 text-xl font-extrabold tracking-tight lg:text-4xl">
            {post.title}
          </h2>

          <article>
            <Markdown className="space-y-4 ">{post.metadata.content}</Markdown>
          </article>
        </div>
      </section>
    </div>
  )
}
