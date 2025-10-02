'use client';

import Head from "next/head";
import AdBanner from "@/components/AdBanner";
import DeveloperToolsNav from "@/components/DeveloperToolsNav";
import { useState } from "react";

function urlEncode(input: string) {
  try {
    return encodeURIComponent(input);
  } catch {
    return 'Invalid input';
  }
}

function urlDecode(input: string) {
  try {
    return decodeURIComponent(input);
  } catch {
    return 'Invalid input';
  }
}

export default function UrlEncoderDecoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    setOutput(urlEncode(input));
  };

  const handleDecode = () => {
    setOutput(urlDecode(input));
  };

  const handleCopy = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <>
      <Head>
        <title>URL Encoder Decoder - Free Online URL Encoding Tool</title>
        <meta name="description" content="Free online URL encoder and decoder. Encode URLs for safe transmission and decode URL-encoded strings instantly. Perfect for web development and API testing." />
        <meta name="keywords" content="url encoder, url decoder, url encoding, percent encoding, uri encoder, web development, api testing" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/url-encoder-decoder" />
        <meta property="og:title" content="URL Encoder Decoder - Free Online Tool" />
        <meta property="og:description" content="Encode URLs for safe transmission and decode URL-encoded strings instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/url-encoder-decoder" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "URL Encoder Decoder",
              "url": "https://freeunitconvertor.com/url-encoder-decoder",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "All",
              "description": "Encode and decode URLs for safe web transmission"
            }),
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              URL Encoder Decoder
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Encode URLs for safe transmission or decode URL-encoded strings. Essential for web development, API testing, and query parameter handling.
            </p>
          </header>

          <main className="max-w-6xl mx-auto">
            <div className="mb-6">
              <AdBanner position="top" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 mb-8">
              <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Input URL or Text
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '200px',
                      height: Math.max(200, Math.min(400, (input.split('\n').length * 20) + 60)) + 'px'
                    }}
                    placeholder="Enter URL or text to encode/decode..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Output
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '200px',
                      height: Math.max(200, Math.min(400, (output.split('\n').length * 20) + 60)) + 'px'
                    }}
                    readOnly
                    value={output}
                    placeholder="Encoded/decoded output will appear here..."
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <button
                  onClick={handleEncode}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Encode URL
                </button>
                <button
                  onClick={handleDecode}
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
                >
                  Decode URL
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:opacity-50"
                >
                  Copy Output
                </button>
              </div>
            </div>

            <div className="mb-6">
              <AdBanner position="inline" />
            </div>

            {/* SEO Content Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                About URL Encoding
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                URL encoding (percent encoding) is crucial for web development and <b>Data Science</b> applications. It ensures special characters in URLs are properly transmitted without breaking web requests or <b>AI artificial Intelligence</b> API calls.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Whether you&apos;re building REST APIs, handling form submissions, or processing query parameters, proper URL encoding prevents errors and security issues. Combine with our <a href="/base64-encoder-decoder" className="text-purple-600 dark:text-purple-400 hover:underline">base64 encoding</a> and <a href="/json-to-csv" className="text-purple-600 dark:text-purple-400 hover:underline">json to csv</a> tools for complete data workflows.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">When to Use URL Encoding</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Query parameters with special characters</li>
                    <li>• Form data submission</li>
                    <li>• API endpoint construction</li>
                    <li>• Search functionality</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Characters That Need Encoding</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Spaces become %20</li>
                    <li>• & becomes %26</li>
                    <li>• = becomes %3D</li>
                    <li>• + becomes %2B</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/weight" className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                  Unit converter weight
                </a>
                <a href="/area" className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                  Unit converter area
                </a>
                <a href="/developer" className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                  All Developer Tools
                </a>
              </div>
            </section>

            {/* Developer Tools Navigation */}
            <DeveloperToolsNav currentPath="/url-encoder-decoder" />
          </main>
        </div>
      </div>
    </>
  );
}
