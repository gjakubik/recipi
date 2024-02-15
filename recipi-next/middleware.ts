export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/admin/:path*',
    '/create',
    '/my-stuff',
    '/my-recipes',
    '/my-menus',
  ],
}
