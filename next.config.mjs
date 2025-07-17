/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['jsonwebtoken'],
  experimental: {
    middlewarePrefetch: 'strict',
  },
  allowedDevOrigins: ['http://localhost:3000', 'https://ab4361ce4a60.ngrok-free.app'],
};

export default nextConfig;
