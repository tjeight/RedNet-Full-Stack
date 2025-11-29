import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  output: "standalone",           // ← this line must be here
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@supabase/supabase-js", "@supabase/realtime-js"],
  },
};

export default nextConfig;