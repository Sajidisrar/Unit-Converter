'use client';

import { useState } from 'react';
import TabContainer from '@/components/shared/TabContainer';
import { Base64Tool, UrlEncoderTool, JwtDecoderTool } from '@/components/encoding-tools';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';

const tabs = [
  { id: 'base64', label: 'Base64', icon: '🔐' },
  { id: 'url', label: 'URL Encoder', icon: '🌐' },
  { id: 'jwt', label: 'JWT Decoder', icon: '🔑' },
];

export default function EncodingToolsClient() {
  const [activeTab, setActiveTab] = useState('base64');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Encoding & Decoding Tools
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Encode and decode Base64, URLs, and JWT tokens. All processing happens in your browser for privacy.
          </p>
        </header>

        {/* Main Tool */}
        <main className="max-w-[1600px] mx-auto">
          {/* Ad Banner - Top */}
          <div className="mb-4">
            <AdBanner position="top" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6">
            {/* Tab Navigation */}
            <TabContainer
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              accentColor="purple"
            />

            {/* Tool Content */}
            <div className="mt-6">
              {activeTab === 'base64' && <Base64Tool />}
              {activeTab === 'url' && <UrlEncoderTool />}
              {activeTab === 'jwt' && <JwtDecoderTool />}
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About Encoding Tools</h2>

            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Base64 Encoding</h3>
                <p>Base64 is a binary-to-text encoding scheme that represents binary data in ASCII string format. It&apos;s commonly used for encoding images in CSS/HTML, transferring data over text-based protocols, and storing complex data in URLs or cookies.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">URL Encoding</h3>
                <p>URL encoding (also known as percent-encoding) converts characters into a format that can be transmitted over the Internet. Special characters, non-ASCII characters, and reserved characters are replaced with a percent sign followed by two hexadecimal digits.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">JWT (JSON Web Tokens)</h3>
                <p>JWT is a compact, URL-safe means of representing claims between two parties. It consists of three parts: header, payload, and signature. JWTs are widely used for authentication and information exchange in web applications.</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Privacy First</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                All encoding and decoding operations are performed entirely in your browser. Your data never leaves your device, ensuring complete privacy and security.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is Base64 encoding and how does it work?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Base64 encoding converts binary data into a 64-character ASCII text format using characters A-Z, a-z, 0-9, +, and /. It takes 3 bytes of binary data and converts them into 4 ASCII characters, making binary data safe for transmission over text-based protocols like email and HTTP.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I convert an image to Base64?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Use our Base64 encoder: 1) Click &quot;File Upload&quot; tab, 2) Drag and drop your image or click to browse, 3) The tool automatically converts it to a Base64 string. Enable &quot;Include data URL prefix&quot; to get the full data URI for direct use in HTML/CSS.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What characters need to be URL encoded?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Characters that must be URL encoded include: spaces (%20), ampersand & (%26), equals = (%3D), question mark ? (%3F), plus + (%2B), forward slash / (%2F), hash # (%23), and percent % (%25). Non-ASCII characters like accented letters and emojis must also be encoded.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is the difference between encodeURI and encodeURIComponent?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">encodeURI() encodes a complete URL, preserving characters like :, /, ?, and # that have special meaning in URLs. encodeURIComponent() encodes everything except alphanumeric characters, making it suitable for encoding URL parameters. Use encodeURIComponent() for query string values.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I decode a JWT token?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Paste your JWT token into our decoder and click &quot;Decode JWT&quot;. You&apos;ll see the decoded header (with algorithm info), payload (containing claims like user ID and expiration), and signature. Our tool shows if the token is expired and explains common claims.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What does JWT exp claim mean?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">The JWT &quot;exp&quot; (expiration) claim indicates when the token expires, stored as a Unix timestamp (seconds since January 1, 1970). After this time, the token should be considered invalid. Our decoder shows both the timestamp and human-readable date.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Is Base64 encoding the same as encryption?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">No, Base64 is NOT encryption. It&apos;s an encoding scheme that converts binary to text - anyone can decode it without a key. For sensitive data, use proper encryption (AES, RSA) before Base64 encoding if you need to transmit encrypted data as text.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">Why does Base64 increase file size?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Base64 increases data size by approximately 33% because it converts every 3 bytes of binary data into 4 ASCII characters. For example, a 1MB file becomes about 1.37MB when Base64 encoded. This overhead is the tradeoff for text-safe transmission.</p>
              </div>
            </div>
          </div>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/encoding" />
        </main>
      </div>
    </div>
  );
}
