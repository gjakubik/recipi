import { User } from 'next-auth'

interface ProfileProps {
  profileUser: User
}

export const Profile = ({ profileUser }: ProfileProps) => {
  return (
    <div>
      <h1>{profileUser.name}</h1>
      <p>{profileUser.email}</p>
    </div>
  )
}
