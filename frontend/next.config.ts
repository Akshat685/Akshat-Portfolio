import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /**
     * Optimize imports from heavy libraries to reduce bundle size.
     * This helps Lighthouse by shipping less JS on the initial load.
     */
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "swiper",
      "gsap",
      "react-lottie",
    ],
  },
};

export default nextConfig;
