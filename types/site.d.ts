export type NavItem = {
  title: string
  href: string
  public?: boolean
  authenticated?: boolean
  admin?: boolean
}

export type NavConfig = {
  items: NavItem[]
  searchVisible?: boolean
  createVisible?: boolean
}
