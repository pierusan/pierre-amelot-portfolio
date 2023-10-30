/** @type {import('next').NextConfig} */
const nextConfig = {
  // It should have been enabled by default by Next 13 but it doesn't seem to be
  // the case. Enabling it to follow the best practices from React 18 (e.g.
  // mounting components twice to catch bugs)
  reactStrictMode: true,
  // https://docs.pmnd.rs/react-three-fiber/getting-started/installation#next.js-13.1-or-latest-version
  transpilePackages: ['three'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/pierre-portfolio-assets/pierre-portfolio-v2/**',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
  // The svgr docs don't seem to work with latest Next so we're using the fix
  // mentioned here:
  // https://github.com/vercel/next.js/issues/48177#issuecomment-1557354538
  webpack(config) {
    // Configures webpack to handle SVG files with SVGR. SVGR optimizes and transforms SVG files
    // into React components. See https://react-svgr.com/docs/next/

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
