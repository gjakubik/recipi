import { NavConfig } from '@/types'

export const adminNavConfig: NavConfig = {
  searchVisible: false,
  createVisible: false,
  items: [
    {
      title: 'Dashboard',
      href: '/admin',
    },
    {
      title: 'Tools',
      href: '/admin/tools',
    },
    {
      title: 'Feature Flags',
      href: '/admin/feature-flags',
    },
  ],
}
