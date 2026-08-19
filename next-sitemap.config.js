const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const blogPosts = require('./src/data/blog-posts.json');

// Build-time lastmod values told Google every URL changed on every deploy,
// which is a signal it learns to ignore. These derive the date from the last
// commit that actually touched the page's source instead.
const gitDateCache = new Map();

function lastCommitDate(relativePath) {
  if (gitDateCache.has(relativePath)) {
    return gitDateCache.get(relativePath);
  }

  let date = null;

  try {
    if (fs.existsSync(path.join(__dirname, relativePath))) {
      const stdout = execFileSync(
        'git',
        ['log', '-1', '--format=%aI', '--', relativePath],
        { cwd: __dirname, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
      ).trim();
      date = stdout ? new Date(stdout).toISOString() : null;
    }
  } catch {
    // Shallow clone, no git, or a detached build environment. Fall through to
    // the build timestamp rather than failing the build.
    date = null;
  }

  gitDateCache.set(relativePath, date);
  return date;
}

function sourceFileFor(routePath) {
  if (routePath === '/') {
    return 'src/app/page.tsx';
  }

  if (routePath.startsWith('/blog/')) {
    const slug = routePath.slice('/blog/'.length);
    const staticRoute = `src/app/blog/${slug}/page.tsx`;

    // Posts driven by blog-posts.json carry their own dates.
    return fs.existsSync(path.join(__dirname, staticRoute))
      ? staticRoute
      : 'src/data/blog-posts.json';
  }

  return `src/app${routePath}/page.tsx`;
}

function lastmodFor(routePath) {
  if (routePath.startsWith('/blog/')) {
    const slug = routePath.slice('/blog/'.length);
    const post = blogPosts.posts.find((entry) => entry.id === slug);

    if (post?.dateModified || post?.date) {
      return new Date(post.dateModified || post.date).toISOString();
    }
  }

  return lastCommitDate(sourceFileFor(routePath)) || new Date().toISOString();
}

// Priority by route shape. Tools and conversion pages are the reason the site
// exists; legal pages are not.
function priorityFor(routePath) {
  if (routePath === '/') return 1.0;
  if (routePath === '/unit-converter') return 0.95;
  if (routePath === '/blog') return 0.9;
  if (routePath.startsWith('/blog/')) return 0.85;
  if (routePath === '/about') return 0.5;
  if (['/privacy', '/terms', '/contact'].includes(routePath)) return 0.3;
  return 0.9;
}

function changefreqFor(routePath) {
  if (routePath === '/' || routePath === '/blog') return 'daily';
  if (['/privacy', '/terms', '/contact'].includes(routePath)) return 'yearly';
  if (routePath === '/about') return 'monthly';
  return 'weekly';
}

// Use the non-www host consistently, with no trailing slash.
const siteUrl = process.env.SITE_URL || 'https://freeunitconvertor.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // The long exclude list here named routes that no longer exist. Only the
  // API route needs excluding now.
  exclude: ['/api', '/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/*?from=', '/*?to='] },
      { userAgent: 'Googlebot', allow: '/', disallow: ['/*?from=', '/*?to='] },
      { userAgent: 'Bingbot', allow: '/', disallow: ['/*?from=', '/*?to='] },
      // The AdSense crawler must reach every page it serves ads on, including
      // converter URLs carrying ?from= / ?to=. Without this the disallow above
      // applies to it and those slots come back unfilled.
      { userAgent: 'Mediapartners-Google', allow: '/' },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
    host: siteUrl,
  },
  transform: async (config, routePath) => ({
    loc: routePath,
    changefreq: changefreqFor(routePath),
    priority: priorityFor(routePath),
    lastmod: lastmodFor(routePath),
  }),
};
