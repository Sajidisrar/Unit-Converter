import type { NextConfig } from "next";

// Only the real domain may be indexed. Amplify preview branches serve
// byte-identical content on *.amplifyapp.com, which competes with production
// for the same queries. amplify.yml already sets SITE_URL per branch, so reuse
// it rather than introducing a second switch.
const PRODUCTION_URL = "https://freeunitconvertor.com";
const isProductionSite = (process.env.SITE_URL || PRODUCTION_URL) === PRODUCTION_URL;

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    if (isProductionSite) {
      return [];
    }

    // Deliberately a header on a crawlable page rather than a robots.txt
    // Disallow: a disallowed URL is never fetched, so the crawler would never
    // read the noindex and the preview could stay indexed indefinitely.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Unit converter consolidation redirects (legacy URLs)
      { source: '/length', destination: '/unit-converter', permanent: true },
      { source: '/weight', destination: '/unit-converter', permanent: true },
      { source: '/temperature', destination: '/unit-converter', permanent: true },
      { source: '/area', destination: '/unit-converter', permanent: true },
      { source: '/speed', destination: '/unit-converter', permanent: true },

      // Removed developer tools -- redirect to homepage
      { source: '/json', destination: '/', permanent: true },
      { source: '/json-prettier', destination: '/', permanent: true },
      { source: '/xml', destination: '/', permanent: true },
      { source: '/xml-formatter', destination: '/', permanent: true },
      { source: '/yaml', destination: '/', permanent: true },
      { source: '/csv', destination: '/', permanent: true },
      { source: '/hash-generator', destination: '/', permanent: true },
      { source: '/encoding', destination: '/', permanent: true },
      { source: '/base64-encoder-decoder', destination: '/', permanent: true },
      { source: '/jwt-decoder', destination: '/', permanent: true },
      { source: '/url-encoder-decoder', destination: '/', permanent: true },
      { source: '/text', destination: '/', permanent: true },
      { source: '/regex-validator', destination: '/', permanent: true },
      { source: '/text-compare', destination: '/', permanent: true },
      { source: '/color-converter', destination: '/', permanent: true },
      { source: '/ai-tools', destination: '/', permanent: true },
      { source: '/ocr-scanner', destination: '/', permanent: true },
      { source: '/aws-practice-exam', destination: '/', permanent: true },
      { source: '/developer', destination: '/', permanent: true },

      // Removed blog posts
      { source: '/blog/ai-prompt-engineering', destination: '/blog', permanent: true },
    ];
  },
};

export default nextConfig;
