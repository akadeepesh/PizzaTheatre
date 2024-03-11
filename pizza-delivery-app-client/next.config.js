/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  reactStrictMode: true,
  // webpack(config) {
  //   config.resolve.fallback = {

  //     // if you miss it, all the other options in fallback, specified
  //     // by next.js will be dropped.
  //     ...config.resolve.fallback,  

  //     fs: false, // the solution of could not found module 'fs'
  //   };
    
  //   return config;
  // },
};

module.exports = nextConfig;
