import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server-rendered so public prices can be read from Stripe and revalidated.
  // A static export cannot refresh those prices after the build.
  poweredByHeader: false,
  devIndicators: false,
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
