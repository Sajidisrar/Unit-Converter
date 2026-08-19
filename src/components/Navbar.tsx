import { toolsByNavGroup } from '@/constants/tools';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';

// Server component. Every tool link is present in the rendered HTML rather
// than behind a JavaScript toggle, so crawlers follow them and the internal
// linking actually counts. The menus use CSS focus-within and native
// <details> disclosure instead of React state.
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--surface)]/85 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Unit Converter
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-ring rounded-md px-2 py-1"
            >
              Home
            </Link>

            {toolsByNavGroup.map((category) => (
              <div key={category.label} className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-ring rounded-md px-2 py-1"
                  aria-haspopup="true"
                >
                  {category.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 top-full pt-2 w-64 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity">
                  <ul className="card-panel py-2 shadow-xl">
                    {category.tools.map((tool) => (
                      <li key={tool.url}>
                        <Link
                          href={tool.url}
                          className="flex items-start gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <span className="text-lg leading-none mt-0.5" aria-hidden="true">{tool.icon}</span>
                          <span>
                            <span className="block text-sm font-medium text-gray-900 dark:text-white">{tool.name}</span>
                            <span className="block text-xs text-gray-500 dark:text-gray-400">{tool.description}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <Link
              href="/blog"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-ring rounded-md px-2 py-1"
            >
              Blog
            </Link>
            <ThemeSwitcher />
          </div>

          {/* Mobile: native disclosure, no JavaScript required */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitcher />
          </div>
        </div>

        <details className="md:hidden pb-4 group">
          <summary className="flex items-center gap-2 cursor-pointer list-none py-2 text-gray-600 dark:text-gray-300">
            <svg className="w-6 h-6 group-open:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className="w-6 h-6 hidden group-open:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-medium">Menu</span>
          </summary>

          <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <Link href="/" className="block py-2 text-gray-600 dark:text-gray-300">Home</Link>

            {toolsByNavGroup.map((category) => (
              <div key={category.label}>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                  {category.label}
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {category.tools.map((tool) => (
                    <li key={tool.url}>
                      <Link
                        href={tool.url}
                        className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-lg"
                      >
                        <span aria-hidden="true">{tool.icon}</span>
                        <span>{tool.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <Link href="/blog" className="block py-2 text-gray-600 dark:text-gray-300">Blog</Link>
          </div>
        </details>
      </div>
    </nav>
  );
}
