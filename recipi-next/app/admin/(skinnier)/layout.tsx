export default async function SkinnerAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto flex flex-col space-y-4 py-12 md:w-5/6 lg:w-2/3">
      {children}
    </div>
  )
}
