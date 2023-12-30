import { NavConfig } from '@/types'

export const defaultNavConfig: NavConfig = {
  searchVisible: true,
  createVisible: true,
  items: [
    {
      title: 'Explore',
      href: '/',
    },
    {
      title: 'My Recipes',
      href: '/my-recipes',
      authenticated: true,
    },
    {
      title: 'Admin',
      href: '/admin',
      admin: true,
    },
  ],
}
