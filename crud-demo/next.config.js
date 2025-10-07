/** @type {import('next').NextConfig} */
const nextConfig = {
  // Simplified configuration for development
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

module.exports = nextConfig;