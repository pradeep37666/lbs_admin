/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'dev.littlebigsocial.com',
      's3.amazonaws.com'
    ],
  }
}

module.exports = nextConfig
