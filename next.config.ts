import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Fuerza a usar este directorio como raíz para resolver módulos
    root: __dirname,
  },
};

export default nextConfig;
