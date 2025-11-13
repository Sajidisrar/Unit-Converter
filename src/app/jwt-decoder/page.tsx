'use client';

import AdBanner from "@/components/AdBanner";
import DeveloperToolsNav from "@/components/DeveloperToolsNav";
import Head from "next/head";
import { useState } from "react";

// Metadata removed from client component

function jwtDecode(input: string) {
  try {
    const parts = input.split('.');
    if (parts.length !== 3) return 'Invalid JWT';
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.stringify(JSON.parse(decoded), null, 2);
  } catch {
    return 'Invalid JWT';
  }
}

export default function JwtDecoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleDecode = () => {
    setOutput(jwtDecode(input));
  };

  const handleCopy = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://freeunitconvertor.com/jwt-decoder" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              JWT Decoder
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Decode and inspect JSON Web Tokens (JWTs) instantly. Perfect for debugging authentication, API testing, and security analysis.
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
                    JWT Token Input
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '150px',
                      height: Math.max(150, Math.min(300, (input.length / 80) * 20 + 80)) + 'px'
                    }}
                    placeholder="Paste your JWT token here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Decoded Payload
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '150px',
                      height: Math.max(150, Math.min(500, (output.split('\n').length * 20) + 80)) + 'px'
                    }}
                    readOnly
                    value={output}
                    placeholder="Decoded JWT payload will appear here..."
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <button
                  onClick={handleDecode}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Decode JWT
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:opacity-50"
                >
                  Copy Payload
                </button>
              </div>
            </div>

            <div className="mb-6">
              <AdBanner position="inline" />
            </div>

            {/* SEO Content Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                About JWT Decoding
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                JSON Web Tokens (JWTs) are essential in modern <b>AI artificial Intelligence</b> and <b>Data Science</b> applications for secure authentication and authorization. Our JWT decoder helps you inspect token contents, verify claims, and debug authentication issues.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Whether you&apos;re building microservices, implementing OAuth flows, or debugging API authentication, understanding JWT structure is crucial. Combine with our <a href="/base64-encoder-decoder" className="text-indigo-600 dark:text-indigo-400 hover:underline">base64 encoding</a> and <a href="/json-to-csv" className="text-indigo-600 dark:text-indigo-400 hover:underline">json to csv</a> tools for complete token analysis workflows.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">JWT Structure</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Header: Algorithm and token type</li>
                    <li>• Payload: Claims and user data</li>
                    <li>• Signature: Verification hash</li>
                    <li>• Separated by dots (.)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Common Use Cases</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Authentication debugging</li>
                    <li>• API security testing</li>
                    <li>• Token expiration checking</li>
                    <li>• Claims inspection</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <strong>Security Note:</strong> This tool only decodes the JWT payload. It does not verify the signature. Always validate JWT signatures server-side for security.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="/weight" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                  Unit converter weight
                </a>
                <a href="/area" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                  Unit converter area
                </a>
                <a href="/developer" className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                  All Developer Tools
                </a>
              </div>
            </section>

            {/* Developer Tools Navigation */}
            <DeveloperToolsNav currentPath="/jwt-decoder" />
          </main>
        </div>
      </div>
    </>
  );
}
