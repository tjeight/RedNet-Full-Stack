import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@supabase/supabase-js", "@supabase/realtime-js"],
  },
  output: "standalone",
  /* config options here */
};

export default nextConfig;
