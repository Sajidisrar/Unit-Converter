"use client";

import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { ReactNode } from "react";

interface StaticBlogPageClientProps {
  category: string;
  title: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: ReactNode;
}

export default function StaticBlogPageClient({
  category,
  title,
  readTime,
  date,
  excerpt,
  content,
}: StaticBlogPageClientProps) {
  return (
    <div className="page-ground">
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {title}
            </h1>

            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400 mb-8">
              <span>📚 {category}</span>
              <span>•</span>
              <span>{readTime}</span>
              <span>•</span>
              <span>{date}</span>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {excerpt}
            </p>
          </header>

          <div className="mb-8">
            <AdBanner position="top" />
          </div>

          {/* Article Content */}
          {content}

          <div className="mt-8 mb-8">
            <AdBanner position="inline" />
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Try Our Tools</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Put your knowledge into practice with our free online tools and calculators.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                All Tools
              </Link>
              <Link href="/developer" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Developer Tools
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
