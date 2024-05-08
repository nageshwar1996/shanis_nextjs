/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/shains.html",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
