'use client'
import { Button } from '@/components/ui/button'

export default function RequestButton({
  sessionToken,
}: {
  sessionToken: string
}) {
  const onClick = async () => {
    const res = await fetch('http://localhost:3005/ingredient/name/egg', {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
    console.log('res', res)
  }

  return (
    <Button className="mt-4" onClick={onClick}>
      Test
    </Button>
  )
}
