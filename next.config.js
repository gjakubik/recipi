/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  images: {
    domains: ['uploadthing.com', 'utfs.io'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
