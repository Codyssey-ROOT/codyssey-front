import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // Dev on https://local.deepfence.site:3000 so the backend cookies on deepfence.site are same-site.
  allowedDevOrigins: ["local.deepfence.site"],
  images: {
    remotePatterns: [
      // Kakao profile images (served over both http and https).
      { hostname: "**.kakaocdn.net" },
      // Uploaded photos (served through CloudFront).
      { protocol: "https", hostname: "d1fhuzgwaqht7z.cloudfront.net" },
    ],
  },
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
