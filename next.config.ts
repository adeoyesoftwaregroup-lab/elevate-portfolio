import type { NextConfig } from "next";

interface ExtendedNextConfig extends NextConfig {
  eslint?: {
    ignoreDuringBuilds?: boolean;
    dirs?: string[];
  };
}

const nextConfig: ExtendedNextConfig = {
  productionBrowserSourceMaps: false,

  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  // CRITICAL ADDITION: Enable Next.js to optimize images served via your Cloudinary CDN asset buckets
  // Completely replace the images block inside nextConfig.ts with this exact format
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Pure domain configuration mapping includes the "res." subdomain
        port: "",
        pathname: "/**",
      },
    ],
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "gsap",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
};

export default nextConfig;
