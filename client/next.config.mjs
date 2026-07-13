/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      { source: "/", destination: "/user" },
      { source: "/admin-dashboard", destination: "/admin/dashboard" },
    ];
  },
};

export default nextConfig;
