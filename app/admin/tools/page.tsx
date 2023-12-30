import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import { TOOL_LIST } from './toolList'

import { Typography } from '@/components/ui/typography'

export default async function CreateRecipePage() {
  const user = await getCurrentUser()

  //redirect to home if not logged in
  if (user?.role !== 'admin') {
    return <Typography>Please log in to see admin console</Typography>
  }

  return (
    <>
      <Typography variant="h2">Tools</Typography>
      <div className="flex flex-col gap-10">
        {TOOL_LIST.map((tool) => (
          <Link href={tool.href} key={tool.name}>
            <div className="flex flex-row gap-2 items-baseline dashed-border-hover">
              <Typography variant="h5">{tool.name}</Typography>
              <Typography>{tool.description}</Typography>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
