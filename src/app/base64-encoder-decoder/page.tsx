'use client';

import Head from "next/head";
import AdBanner from "@/components/AdBanner";
import DeveloperToolsNav from "@/components/DeveloperToolsNav";
import { useState } from "react";

function base64Encode(input: string) {
  try {
    return btoa(input);
  } catch {
    return 'Invalid input for Base64 encoding';
  }
}

function base64Decode(input: string) {
  try {
    return atob(input);
  } catch {
    return 'Invalid Base64 string';
  }
}

export default function Base64EncoderDecoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    setOutput(base64Encode(input));
  };

  const handleDecode = () => {
    setOutput(base64Decode(input));
  };

  const handleCopy = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <>
      <Head>
        <title>Base64 Encoder Decoder - Free Online Base64 Encoding Tool</title>
        <meta name="description" content="Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 strings instantly. Perfect for web development, API testing, and data transmission." />
        <meta name="keywords" content="base64 encoder, base64 decoder, base64 encoding, base64 decoding, online base64, text to base64, base64 converter" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/base64-encoder-decoder" />
        <meta property="og:title" content="Base64 Encoder Decoder - Free Online Tool" />
        <meta property="og:description" content="Convert text to Base64 and decode Base64 strings instantly. Perfect for web development and API testing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/base64-encoder-decoder" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Base64 Encoder Decoder",
              "url": "https://freeunitconvertor.com/base64-encoder-decoder",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "All",
              "description": "Encode and decode Base64 strings for web development and data transmission"
            }),
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Base64 Encoder Decoder
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Encode text to Base64 or decode Base64 strings instantly. Essential for web development, API testing, and secure data transmission.
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
                    Input Text
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '250px',
                      height: Math.max(250, Math.min(500, (input.split('\n').length * 20) + 80)) + 'px'
                    }}
                    placeholder="Enter text to encode or Base64 string to decode..."
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
                      minHeight: '250px',
                      height: Math.max(250, Math.min(500, (output.split('\n').length * 20) + 80)) + 'px'
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
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Encode to Base64
                </button>
                <button
                  onClick={handleDecode}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Decode from Base64
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
                About Base64 Encoding
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                <strong>Base64 encoding</strong> is fundamental in <b>AI artificial Intelligence</b> and <b>Data Science</b> workflows for safely transmitting binary data over text-based protocols. This encoding scheme converts binary data into ASCII characters, making it perfect for APIs, email attachments, and web applications.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Whether you&apos;re embedding images in HTML, sending files through APIs, or working with authentication tokens, Base64 encoding ensures data integrity. Combine with our <a href="/json-to-csv" className="text-green-600 dark:text-green-400 hover:underline">json to csv</a> converter for complete data processing pipelines.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Common Use Cases</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Email attachment encoding</li>
                    <li>• Data URIs for images in CSS/HTML</li>
                    <li>• API authentication tokens</li>
                    <li>• Binary data transmission</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Benefits</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Safe for text-only protocols</li>
                    <li>• Preserves binary data integrity</li>
                    <li>• Universally supported</li>
                    <li>• Easy to implement</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/weight" className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  Unit converter weight
                </a>
                <a href="/area" className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  Unit converter area
                </a>
                <a href="/developer" className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                  All Developer Tools
                </a>
              </div>
            </section>

            {/* Developer Tools Navigation */}
            <DeveloperToolsNav currentPath="/base64-encoder-decoder" />
          </main>
        </div>
      </div>
    </>
  );
}
