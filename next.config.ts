import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // Unit converter consolidation redirects
      { source: '/length', destination: '/unit-converter', permanent: true },
      { source: '/weight', destination: '/unit-converter', permanent: true },
      { source: '/temperature', destination: '/unit-converter', permanent: true },
      { source: '/area', destination: '/unit-converter', permanent: true },
      { source: '/speed', destination: '/unit-converter', permanent: true },

      // Encoding tools consolidation redirects
      { source: '/base64-encoder-decoder', destination: '/encoding', permanent: true },
      { source: '/jwt-decoder', destination: '/encoding', permanent: true },
      { source: '/url-encoder-decoder', destination: '/encoding', permanent: true },

      // Text tools consolidation redirects
      { source: '/regex-validator', destination: '/text', permanent: true },
      { source: '/text-compare', destination: '/text', permanent: true },

      // Other tool redirects
      { source: '/json-prettier', destination: '/json', permanent: true },
      { source: '/xml-formatter', destination: '/xml', permanent: true },
    ];
  },
};

export default nextConfig;
