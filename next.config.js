/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'uploadthing.com' },
      { hostname: 'utfs.io' },
      { hostname: 'lh3.googleusercontent.com' },
    ],
  },
}

module.exports = nextConfig
