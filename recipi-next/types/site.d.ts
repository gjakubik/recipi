export type NavItem = {
  title: string
  href: string
  public?: boolean
  authenticated?: boolean
  admin?: boolean
}

export type NavGroup = {
  title: string
  href: string
  minWidth: 'small' | 'medium' | 'large'
  items: NavItem[]
  authenticated?: boolean
}

export type NavConfig = {
  items: Array<NavItem | NavGroup>
  searchVisible?: boolean
  createVisible?: boolean
}
