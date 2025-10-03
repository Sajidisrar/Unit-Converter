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
  },
  {
    title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, HSL, HSV, CMYK formats with a color picker',
    url: '/color-converter',
    icon: '🎨'
  },
  {
    title: 'JSON Prettier',
    description: 'Format and visualize JSON data with an interactive expand/collapse tree structure',
    url: '/json-prettier',
    icon: '✨'
  },
  {
    title: 'JSON Parser',
    description: 'Parse, validate, and analyze JSON data with interactive tree view and statistics',
    url: '/json-parser',
    icon: '🔧'
  },
  {
    title: 'XML Parser',
    description: 'Parse, validate, and analyze XML data with interactive tree view and element analysis',
    url: '/xml-parser',
    icon: '🛠️'
  }
];

export default function DeveloperPage() {
  return (
    <>
      <Head>
        <title>Free Online Developer Tools | JSON, Base64, URL, JWT, XML Converters</title>
        <meta name="description" content="Use our free online developer tools to convert JSON, CSV, Base64, XML, and URL data. Encode, decode, format, and compare instantly. Perfect for developers, data science, and API workflows." />
        <meta name="keywords" content="developer tools, JSON to CSV, Base64 encoder, Base64 decoder, JSON formatter, URL encoder, JWT decoder, XML parser, XML formatter, JSON parser, online tools, data science tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/developer" />
        <meta property="og:title" content="Free Online Developer Tools - JSON, Base64, URL, JWT, XML" />
        <meta property="og:description" content="Instantly convert and analyze JSON, Base64, XML, and URL data with free developer tools. Encode, decode, parse, and format directly in your browser." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/developer" />
      </Head>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are free online developer tools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Free online developer tools help you convert, encode, decode, and format data such as JSON, XML, Base64, and URLs directly in your browser without installing software."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert JSON to CSV online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, with our JSON to CSV Converter you can instantly transform JSON data into CSV format for spreadsheets and analysis."
            }
          },
          {
            "@type": "Question",
            "name": "Is it safe to use a JWT Decoder online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our JWT Decoder lets you inspect payload and claims of JSON Web Tokens in your browser. For sensitive production tokens, always use secure local methods."
            }
          }
        ]
      })}} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Developer Tools
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Free Online Developer Tools for Everyday Use
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore essential utilities for developers, data scientists, and AI engineers. Convert, encode, decode, and transform data formats like JSON, XML, Base64, and more directly in your browser.
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

            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h3 className="font-medium">What is a Base64 Encoder/Decoder used for?</h3>
                  <p>Base64 encoding is used to safely transmit binary data like images or files as text. Our online Base64 tool lets you quickly encode and decode data for APIs and storage.</p>
                </div>
                <div>
                  <h3 className="font-medium">How can I format and validate JSON data?</h3>
                  <p>Use our JSON Prettier and JSON Parser tools to format, visualize, and validate JSON data structures with an interactive tree view.</p>
                </div>
                <div>
                  <h3 className="font-medium">Which developer tools are most popular?</h3>
                  <p>Our most used tools include the JSON to CSV Converter, URL Encoder/Decoder, JWT Decoder, and XML Formatter for quick developer workflows.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}