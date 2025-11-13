import AdBanner from '@/components/AdBanner';
import { developerTools } from '@/data/developerTools';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "15+ Free Online Developer Tools for 2025 | JSON, Regex, AI & More",
  description: "Best free online developer tools for 2025. JSON formatter, Base64 encoder, URL encoder, JWT decoder, XML formatter, regex validator, AI cheat sheet, prompt engineering. Trusted by 100K+ developers. No registration required.",
  keywords: "free developer tools, JSON formatter online, Base64 encoder decoder, URL encoder decoder, JWT token decoder, XML formatter, regex validator, AI cheat sheet, prompt engineering, JSON to CSV converter, JSON parser, XML parser, text compare tool, color converter, developer utilities, web development tools, API testing tools, programming tools, code formatter, data conversion tools, AI development tools, machine learning tools",
  robots: "index, follow",
  alternates: {
    canonical: 'https://freeunitconvertor.com/developer',
  },
  openGraph: {
    title: "Free Online Developer Tools - JSON, Base64, URL, JWT, XML",
    description: "Instantly convert and analyze JSON, Base64, XML, and URL data with free developer tools. Encode, decode, parse, and format directly in your browser.",
    type: "website",
    url: "https://freeunitconvertor.com/developer",
  },
  other: {
    'application/ld+json': JSON.stringify({
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
    })
  }
};

export default function DeveloperPage() {
  return (
    <>
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

          <div className="mb-8">
            <AdBanner position="inline" />
          </div>

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Developer Tools Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Streamline Your Data Processing & AI Workflows</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Build data workflows with <Link href="/json-to-csv" className="text-blue-600 dark:text-blue-400 hover:underline">json to csv</Link> conversion, perform <Link href="/base64-encoder-decoder" className="text-blue-600 dark:text-blue-400 hover:underline">base64 encoding</Link>, and manipulate data formats directly in your browser. These utilities are essential for modern stacks spanning <strong>AI artificial Intelligence</strong> and <strong>Data Science</strong>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Integrate Seamless Unit Conversions</h3>
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

            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Popular Developer Tool Categories</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Based on trending searches, developers frequently use these online utilities to streamline daily coding and debugging tasks.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>JSON Tools:</strong> JSON Formatter, JSON Parser, and JSON Compare for clean, readable data.</li>
                <li><strong>Encoding Tools:</strong> Base64 Encoder/Decoder and URL Encoder for secure data exchange.</li>
                <li><strong>Security Tools:</strong> JWT Decoder for decoding and verifying tokens safely.</li>
                <li><strong>XML Tools:</strong> XML Formatter and XML Compare for structured data validation.</li>
                <li><strong>Text Tools:</strong> Text Compare and Color Converter for developers working with design and content.</li>
              </ul>
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

            <div className="mt-10 text-gray-700 dark:text-gray-300">
              <p>
                Our <strong>free developer tools online</strong> help you boost productivity with quick JSON, XML, and Base64 transformations. Built for <strong>frontend developers, backend engineers, and data analysts</strong>, these utilities save time and reduce errors in <strong>API testing, web integrations, and AI-driven data preprocessing</strong>.
              </p>
              <p className="mt-4">
                Start using the most searched <strong>developer tools 2025</strong> — easy, fast, and accessible from any browser.
                Enhance your workflow with tools optimized for SEO visibility, user experience, and developer performance.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}