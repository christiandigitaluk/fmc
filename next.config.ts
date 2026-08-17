import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // The circuit map is fine-detail cartography with small place labels,
    // which the default quality of 75 visibly mushes. Allow a higher setting
    // for that one image (Next only honours qualities listed here).
    qualities: [75, 92],
  },
};

export default nextConfig;
