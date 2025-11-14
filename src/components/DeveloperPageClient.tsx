"use client";

import AdBanner from '@/components/AdBanner';
import Link from 'next/link';
import { ReactNode } from 'react';

interface DeveloperTool {
  title: string;
  description: string;
  url: string;
  icon: string;
}

interface DeveloperPageClientProps {
  tools: DeveloperTool[];
  content: ReactNode;
}

export default function DeveloperPageClient({ tools, content }: DeveloperPageClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Free Online Developer Tools (2025)
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Best Online Developer Tools for Programming & AI Development
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            <strong>Trusted by 100K+ developers worldwide.</strong> Essential utilities for developers, data scientists, and AI engineers.
            Format JSON, encode Base64, decode JWT, validate regex, and transform data formats instantly in your browser.
          </p>

          <div className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            <p>
              These <strong>free online developer tools</strong> are designed for web developers, software engineers, and data scientists who need quick solutions for everyday tasks.
              Whether you&apos;re <strong>formatting JSON and XML</strong>, <strong>encoding Base64</strong>, or <strong>debugging JWT tokens</strong>, our tools are trusted by thousands of developers worldwide.
            </p>
            <p className="mt-4">
              Explore tools for <strong>API development</strong>, <strong>data transformation</strong>, <strong>web encoding</strong>, and <strong>frontend debugging</strong>.
              Each tool is optimized for performance and SEO visibility to help you work faster while staying up to date with modern developer workflows.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <AdBanner position="top" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {tools.map((tool, index) => (
            <Link
              key={index}
              href={tool.url}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{tool.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tool.description}
                  </p>
                </div>
                <div className="text-blue-500 group-hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mb-8">
          <AdBanner position="inline" />
        </div>

        {content}
      </div>
    </div>
  );
}
