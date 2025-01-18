import Markdown from "react-markdown"

import { post } from "@/entities/post/_vm/moc-data"
import Image from "next/image"

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
        <div className="relative m-auto max-w-4xl flex flex-col items-start justify-center gap-8">
          <h1 className="mb-4 text-xl font-extrabold tracking-tight lg:text-4xl">
            {post.title}
          </h1>
          <div className="overflow-hidden  w-full">
            <Image
              height={600}
              width={1000}
              src={`${post.metadata.image.imgix_url}`}
              alt={post.title}
              className="mx-auto aspect-video object-cover  rounded-xl"
            />
          </div>

          <Markdown className="space-y-4 ">
            {post.metadata.content}
          </Markdown>
        </div>
      </section>
    </div>
  )
}
