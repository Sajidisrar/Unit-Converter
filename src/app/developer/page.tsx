'use client';

import Link from 'next/link';
import Head from 'next/head';

const developerTools = [
  {
    title: 'JSON to CSV Converter',
    description: 'Convert JSON data to CSV format for spreadsheets and data analysis',
    url: '/json-to-csv',
    icon: '📊'
  },
  {
    title: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings for data transmission and storage',
    url: '/base64-encoder-decoder',
    icon: '🔐'
  },
  {
    title: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for web development and API calls',
    url: '/url-encoder-decoder',
    icon: '🌐'
  },
  {
    title: 'JWT Decoder',
    description: 'Decode JSON Web Tokens to inspect payload and claims',
    url: '/jwt-decoder',
    icon: '🔑'
  },
  {
    title: 'XML Formatter',
    description: 'Format and minify XML data for better readability and debugging',
    url: '/xml-formatter',
    icon: '📄'
  },
  {
    title: 'JSON Compare',
    description: 'Compare two JSON objects and find differences instantly',
    url: '/json-compare',
    icon: '🔍'
  },
  {
    title: 'XML Compare',
    description: 'Compare two XML documents and identify structural differences',
    url: '/xml-compare',
    icon: '⚖️'
  },
  {
    title: 'Text Compare',
    description: 'Compare text documents by lines, words, or characters',
    url: '/text-compare',
    icon: '📝'
  }
];

export default function DeveloperPage() {
  return (
    <>
      <Head>
        <title>Developer Tools - Base64, JSON, URL, JWT, Number Base Converter | Free Online Tools</title>
        <meta name="description" content="Free online developer tools and unit converters. Easily use Base64 Encoder/Decoder, JSON Formatter/Minifier, URL Encoder/Decoder, Unix Timestamp Converter, JWT Decoder, Number Base Converter, Text to ASCII conversion, JSON to CSV, Base64 encoding, and more. Perfect for developers, AI, Data Science, and everyday conversions like area and weight." />
        <meta name="keywords" content="developer tools, Base64 encoder, Base64 encoding, JSON formatter, JSON to CSV, URL encoder, JWT decoder, Unix timestamp, number base converter, ASCII converter, free online tools, AI, artificial intelligence, data science, unit converter area, unit converter weight" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/developer" />
        <meta property="og:title" content="Developer Tools - Base64, JSON, URL, JWT Converter" />
        <meta property="og:description" content="Free online developer tools for Base64, JSON, URL, JWT, and more. Essential utilities for developers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/developer" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Developer Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Essential utilities for developers, data scientists, and AI engineers. Convert, encode, decode, and transform data with our comprehensive suite of tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
            {developerTools.map((tool, index) => (
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

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Developer Tools Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Data Processing & AI</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Build data workflows with <Link href="/json-to-csv" className="text-blue-600 dark:text-blue-400 hover:underline">json to csv</Link> conversion, perform <Link href="/base64-encoder-decoder" className="text-blue-600 dark:text-blue-400 hover:underline">base64 encoding</Link>, and manipulate data formats directly in your browser. These utilities are essential for modern stacks spanning <strong>AI artificial Intelligence</strong> and <strong>Data Science</strong>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Unit Conversions</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  When your applications handle measurements, pair our developer utilities with the <Link href="/area" className="text-blue-600 dark:text-blue-400 hover:underline">Unit converter area</Link> and <Link href="/weight" className="text-blue-600 dark:text-blue-400 hover:underline">Unit converter weight</Link> to normalize inputs across metric and imperial systems.
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Pro Tip:</strong> Export structured datasets from APIs as JSON, then transform to CSV for spreadsheets or BI tools. Encode small assets with Base64 for transport, and decode safely within your debugging workflow.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}