/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
