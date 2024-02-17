/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  reactStrictMode: true,
};

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};
