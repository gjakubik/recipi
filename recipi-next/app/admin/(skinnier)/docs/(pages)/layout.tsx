import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'

export default function MarkdownPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="w-max">
        <Link
          href="/admin/docs"
          className="flex flex-row items-center gap-1 dashed-border-hover"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Docs
        </Link>
      </div>
      {children}
      <div className="w-max">
        <Link
          href="/admin/docs"
          className="flex flex-row items-center gap-1 dashed-border-hover"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Docs
        </Link>
      </div>
    </>
  )
}
