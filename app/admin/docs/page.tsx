import Link from 'next/link'
import { getCurrentUser } from '@/lib/session'
import { getAllDocs, docs } from './docs'

import { Typography } from '@/components/ui/typography'
import { Separator } from '@/components/ui/separator'

const DocsPage = async () => {
  const user = await getCurrentUser()
  const docs = getAllDocs()

  if (!user) {
    return <Typography>Please log in to view docs</Typography>
  }
  return (
    <>
      <Typography variant="h2">Docs</Typography>
      <div className="flex flex-col gap-2">
        {docs
          .filter((doc) => doc.published)
          .map(({ slug, title, description, created, updated }) => (
            <Link
              href={`/admin/docs/${slug}`}
              key={slug}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between dashed-border-hover pb-2 gap-1"
            >
              <div className="flex flex-col">
                <Typography variant="h3">{title}</Typography>
                <Typography variant="pn">{description}</Typography>
              </div>
              <div className="flex flex-row h-5 min-w-[316px] justify-start gap-4 ">
                <Typography variant="extralight">Created: {created}</Typography>
                <Separator orientation="vertical" />
                <Typography variant="extralight">Updated: {updated}</Typography>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}

export default DocsPage
