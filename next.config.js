/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    reactRemoveProperties: true,
  },

  pageExtensions: ['ts']
}

module.exports = nextConfig
