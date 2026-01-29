import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Fuerza a usar este directorio como raíz para resolver módulos
    root: __dirname,
  },
};

export default nextConfig;
