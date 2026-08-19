import { popularConversions, toolsByCategory } from '@/constants/tools';
import Link from 'next/link';

// Sitemap-style footer. Rendered on every page, so these are the cheapest
// internal links on the site -- every tool should be reachable from here.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">Free Unit Converter</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Free online conversion tools for length, weight, temperature, volume, energy,
              pressure and more. No registration, no downloads, results as you type.
            </p>
          </div>

          {toolsByCategory.map((category) => (
            <div key={category.id}>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
                {category.label}
              </h2>
              <ul className="space-y-2">
                {category.tools.map((tool) => (
                  <li key={tool.url}>
                    <Link
                      href={tool.url}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
            Popular Conversions
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {popularConversions.map((pair) => (
              <li key={pair.url}>
                <Link
                  href={pair.url}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {pair.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {year} Free Unit Converter. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
