import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: "/triftly-www",
        assetPrefix: "/triftly-www",
        images: { unoptimized: true },
      }
    : {
        output: "standalone" as const,
      }),
  // Silence multi-lockfile workspace inference when sibling repos exist nearby.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
