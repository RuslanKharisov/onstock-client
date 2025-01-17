import Markdown from "react-markdown"

import { post } from "@/entities/post/_vm/moc-data"
import { getFormattedDate } from "@/shared/lib/utils"
import Image from "next/image"

export async function SingleBlog({
  className,
}: {
  query?: any
  className?: string
  status?: "draft" | "published" | "any"
}) {
  const date = getFormattedDate(post.metadata.published_date)

  return (
    <div className={className}>
      <section className="container m-auto grid items-center pb-8">
        <div className="relative m-auto flex max-w-[750px] flex-col items-start gap-2">
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tighter text-black dark:text-white md:text-4xl">
            {post.title}
          </h1>
          <div className="mb-10 w-full overflow-hidden rounded-xl">
            <Image
              height={600}
              width={1000}
              src={`${post.metadata.image.imgix_url}`}
              alt={post.title}
              className="aspect-video w-full object-cover"
            />
          </div>
          <div className="mb-8 md:flex">
            <Image
              height={600}
              width={600}
              className="mr-2 h-[60px] w-[60px] rounded-full object-cover"
              src={`${post.metadata.author.metadata.image.imgix_url}`}
              alt={post.metadata.author.title}
            />
            <div className="mb-4 flex flex-col">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {post.metadata.author.title}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">{date}</span>
            </div>
            <div className="md:absolute md:right-0">
              {post.metadata.categories.map((category: any) => {
                return (
                  <span
                    className="mb-1 mr-1 rounded-full border border-primary/60 bg-primary px-3 py-1 text-white "
                    key={category.slug}
                  >
                    {category.title}
                  </span>
                )
              })}
            </div>
          </div>
          <Markdown className="space-y-4 text-zinc-700 dark:text-zinc-300">
            {post.metadata.content}
          </Markdown>
        </div>
      </section>
    </div>
  )
}
