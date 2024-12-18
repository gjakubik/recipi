import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { TOOL_LIST } from './toolList'

import { Typography } from '@/components/ui/typography'

export default async function ToolsPage() {
  const user = await getCurrentUser()

  //redirect to home if not logged in
  if (user?.role !== 'admin') {
    return <Typography>Please log in to see admin console</Typography>
  }

  return (
    <>
      <Typography variant="h2">Tools</Typography>
      <div className="flex flex-col gap-4">
        {TOOL_LIST.map((tool) => (
          <Link href={tool.href} key={tool.name}>
            <div className="dashed-border-hover flex flex-row items-baseline gap-2">
              <Typography variant="h5">{tool.name}</Typography>
              <Typography>{tool.description}</Typography>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
