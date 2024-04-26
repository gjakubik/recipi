import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Dot } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mx-auto w-3/5">
      <div className="long-dashed-border w-full" />
      <div className="flex flex-row items-center justify-center gap-2 p-4">
        <p className="text-sm">
          <a href="mailto:support@recipi.mom">support@recipi.mom</a>
        </p>
        <Dot className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm">
          <Link href="/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  )
}
