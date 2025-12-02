/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // IMPORTANT: Use non-www version consistently (no trailing slash)
  siteUrl: process.env.SITE_URL || 'https://freeunitconvertor.com',
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
        disallow: ['/*?from=', '/*?to=', '/*?*='],  // Block query parameter URLs
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/*?from=', '/*?to=', '/*?*='],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/*?from=', '/*?to=', '/*?*='],
      },
    ],
    additionalSitemaps: [
      'https://freeunitconvertor.com/sitemap.xml',
    ],
    host: 'https://freeunitconvertor.com',
  },
  transform: async (config, path) => {
    // Homepage - highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }

    // Blog index - high priority for content hub
    if (path === '/blog') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Individual blog posts - high priority for SEO traffic
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.85,
        lastmod: new Date().toISOString(),
      }
    }

    // Consolidated unit converter - highest priority for converters
    if (path === '/unit-converter') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.95,
        lastmod: new Date().toISOString(),
      }
    }

    // Other converter pages - high priority (core tools)
    if (path.includes('/cooking') || path.includes('/fuel-economy') ||
        path.includes('/fitness') || path.includes('/power') ||
        path.includes('/electricity-consumption')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Consolidated developer tools - high priority (traffic drivers)
    if (path === '/encoding' || path === '/text' || path === '/ai-tools' ||
        path === '/json' || path === '/xml' || path === '/yaml' || path === '/csv' ||
        path === '/hash-generator') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }

    // Developer hub and color converter - high priority
    if (path.includes('/developer') || path.includes('/color-converter')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }

    // About page - medium priority
    if (path === '/about') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      }
    }

    // Legal pages - low priority
    if (path === '/privacy' || path === '/terms' || path === '/contact') {
      return {
        loc: path,
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date().toISOString(),
      }
    }

    // Default for any other pages
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: new Date().toISOString(),
    }
  },
}
