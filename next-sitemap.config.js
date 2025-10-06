/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://freeunitconvertor.com/',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://freeunitconvertor.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }
    
    if (path.includes('/length') || path.includes('/weight') || path.includes('/temperature') || 
        path.includes('/area') || path.includes('/speed') || path.includes('/cooking') || 
        path.includes('/fuel-economy') || path.includes('/fitness')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }
    
    if (path.includes('/developer') || path.includes('/json-to-csv') || 
        path.includes('/base64-encoder-decoder') || path.includes('/url-encoder-decoder') ||
        path.includes('/jwt-decoder') || path.includes('/xml-formatter') ||
        path.includes('/json-compare') || path.includes('/xml-compare') ||
        path.includes('/text-compare') || path.includes('/color-converter') ||
        path.includes('/json-prettier') || path.includes('/json-parser') ||
        path.includes('/xml-parser') || path.includes('/ai-cheat-sheet') ||
        path.includes('/regex-validator') || path.includes('/prompt-engineering')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }
    
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    }
  },
}
