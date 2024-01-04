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
      title: 'My Stuff',
      href: '/my-stuff',
      minWidth: 120,
      items: [
        {
          title: 'Recipes',
          href: '/my-recipes',
          authenticated: true,
        },
        {
          title: 'Menus',
          href: '/my-menus',
          authenticated: true,
        },
      ],
    },
    {
      title: 'Admin',
      href: '/admin',
      admin: true,
    },
  ],
}
