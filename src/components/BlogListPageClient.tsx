"use client";

import AdBanner from "@/components/AdBanner";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
}

interface BlogListPageClientProps {
  posts: BlogPost[];
}

export default function BlogListPageClient({ posts }: BlogListPageClientProps) {
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Unit Converter Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert guides, tips, and insights on unit conversion, measurement techniques, engineering calculations, and developer tools.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          <div className="mb-8">
            <AdBanner position="top" />
          </div>

          {/* Featured Article */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Featured Article</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex items-center justify-center">
                  <div className="text-6xl">📝</div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold"
                  >
                    Read Full Article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Articles Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((article) => (
                <Link key={article.id} href={`/blog/${article.id}`} className="group">
                  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600">
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📝</span>
                        <div>
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs font-medium">
                            {article.category}
                          </span>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-gray-500 dark:text-gray-400 text-xs">{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/blog?category=guides" className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Guides</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Tutorials & How-tos</p>
              </Link>
              <Link href="/blog?category=development" className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                <div className="text-2xl mb-2">💻</div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Development</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Developer Tools</p>
              </Link>
              <Link href="/blog?category=energy" className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 text-center hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Energy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Power & Energy</p>
              </Link>
              <Link href="/blog?category=ai" className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="font-semibold text-gray-800 dark:text-white">AI</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI & Machine Learning</p>
              </Link>
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get the latest unit conversion tips, engineering guides, and developer tool updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </section>

          {/* Bottom Ad Banner */}
          <div className="mt-8">
            <AdBanner position="inline" />
          </div>
        </main>
      </div>
    </div>
  );
}
