/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image-comic.pstatic.net",
      },
      {
        protocol: "https",
        hostname: "kr-a.kakaopagecdn.com",
      },
    ],
  },
};

export default nextConfig;
