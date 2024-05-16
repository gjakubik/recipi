import { ResolvingMetadata, Metadata } from 'next'
import { getRecipe } from '@/lib/db/api'
import { Container } from '@/components/ui/container'
import { MainNav } from '@/components/MainNav'
import { defaultNavConfig } from '@/config/default'
import Footer from '@/components/Footer'

export async function generateMetadata(
  { params }: { params: { recipeID: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = parseInt(params.recipeID)
  const recipe = await getRecipe(id)

  const parentMetadata = await parent
  const previousImages = parentMetadata.openGraph?.images || []

  return {
    title: recipe?.title || parentMetadata.title,
    description: recipe?.description || parentMetadata.description,
    openGraph: {
      title: recipe?.title || parentMetadata.openGraph?.title,
      description: recipe?.description || parentMetadata.openGraph?.description,
      images: recipe?.titleImage?.url
        ? [recipe?.titleImage?.url, ...previousImages]
        : previousImages,
    },
  }
}

export default async function RecipePageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-min-screen flex flex-col">
      <MainNav config={defaultNavConfig} />
      <Container className="flex-col space-y-4 pb-8 md:w-5/6 lg:w-2/3">
        {children}
      </Container>
      <Footer />
    </div>
  )
}
