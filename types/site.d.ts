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
  minWidth: string | number
  items: NavItem[]
}

export type NavConfig = {
  items: Array<NavItem | NavGroup>
  searchVisible?: boolean
  createVisible?: boolean
}
