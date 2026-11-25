import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A static site: `npm run build` writes plain files to out/.
  output: "export",
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
