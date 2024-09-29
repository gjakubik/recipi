import Link from 'next/link'

interface SettingsPageProps {
  params: {
    userId: string
  }
}

export default function SettingsPage({
  params: { userId },
}: SettingsPageProps) {
  return (
    <div>
      <h1>Settings</h1>
      <ul>
        <li>
          <Link href={`/profile/${userId}/settings/billing`}>Billing</Link>
        </li>
      </ul>
    </div>
  )
}
