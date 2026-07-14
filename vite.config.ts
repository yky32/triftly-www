import { defineConfig } from 'vite';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  // Project Pages URL: https://yky32.github.io/triftly-www/
  base: isGitHubPages ? '/triftly-www/' : '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
