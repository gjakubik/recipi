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
      href: '/my-recipes',
      minWidth: 'medium',
      authenticated: true,
      items: [
        {
          title: 'Saved Recipes',
          href: '/saved-recipes',
          authenticated: true,
        },
        {
          title: 'My Recipes',
          href: '/my-recipes',
          authenticated: true,
        },
        {
          title: 'My Menus',
          href: '/my-menus',
          authenticated: true,
        },
      ],
    },
  ],
}
