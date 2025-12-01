'use client';

import { useState, useCallback } from 'react';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';

type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
}

// MD5 implementation (Web Crypto doesn't include MD5)
function md5(input: string): string {
  function rotateLeft(value: number, shift: number): number {
    return (value << shift) | (value >>> (32 - shift));
  }

  function addUnsigned(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  function F(x: number, y: number, z: number): number { return (x & y) | (~x & z); }
  function G(x: number, y: number, z: number): number { return (x & z) | (y & ~z); }
  function H(x: number, y: number, z: number): number { return x ^ y ^ z; }
  function I(x: number, y: number, z: number): number { return y ^ (x | ~z); }

  function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(str: string): number[] {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    const wordCount = ((bytes.length + 8) >> 6) + 1;
    const words: number[] = new Array(wordCount * 16).fill(0);

    for (let i = 0; i < bytes.length; i++) {
      words[i >> 2] |= bytes[i] << ((i % 4) * 8);
    }

    words[bytes.length >> 2] |= 0x80 << ((bytes.length % 4) * 8);
    words[wordCount * 16 - 2] = bytes.length * 8;

    return words;
  }

  function wordToHex(value: number): string {
    let hex = '';
    for (let i = 0; i <= 3; i++) {
      const byte = (value >> (i * 8)) & 255;
      hex += byte.toString(16).padStart(2, '0');
    }
    return hex;
  }

  const x = convertToWordArray(input);
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;

  const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d;

    a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);

    a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = GG(d, a, b, c, x[k + 10], S22, 0x02441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);

    a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x04881d05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);

    a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);

    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
}

export default function HashGeneratorClient() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<HashAlgorithm | 'all'>('all');
  const [uppercase, setUppercase] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const algorithms: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

  const generateHash = useCallback(async (text: string, algorithm: HashAlgorithm): Promise<string> => {
    if (algorithm === 'MD5') {
      return md5(text);
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }, []);

  const handleGenerate = async () => {
    if (!input) {
      setHashes([]);
      return;
    }

    setIsGenerating(true);

    try {
      if (selectedAlgorithm === 'all') {
        const results = await Promise.all(
          algorithms.map(async (algo) => ({
            algorithm: algo,
            hash: await generateHash(input, algo),
          }))
        );
        setHashes(results);
      } else {
        const hash = await generateHash(input, selectedAlgorithm);
        setHashes([{ algorithm: selectedAlgorithm, hash }]);
      }
    } catch (error) {
      console.error('Hash generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (hash: string, index: number) => {
    try {
      const textToCopy = uppercase ? hash.toUpperCase() : hash;
      await navigator.clipboard.writeText(textToCopy);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleClear = () => {
    setInput('');
    setHashes([]);
  };

  const loadSample = () => {
    setInput('Hello, World!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Hash Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate cryptographic hashes using MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms. Perfect for checksums and data verification.
          </p>
        </header>

        {/* Main Tool */}
        <main className="max-w-4xl mx-auto">
          {/* Ad Banner - Top */}
          <div className="mb-4">
            <AdBanner position="top" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            {/* Input Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Text Input
                </label>
                <button
                  onClick={loadSample}
                  className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                >
                  Load sample
                </button>
              </div>
              <textarea
                className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                style={{ minHeight: '120px' }}
                placeholder="Enter text to hash..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Options */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">Algorithm:</label>
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value as HashAlgorithm | 'all')}
                  className="text-sm border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Algorithms</option>
                  {algorithms.map((algo) => (
                    <option key={algo} value={algo}>{algo}</option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Uppercase output
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <button
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Hash'}
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Clear
              </button>
            </div>

            {/* Results */}
            {hashes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Generated Hashes</h3>
                {hashes.map((result, index) => (
                  <div
                    key={result.algorithm}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {result.algorithm}
                        <span className="ml-2 text-xs text-gray-400">
                          ({result.hash.length * 4} bits)
                        </span>
                      </span>
                      <button
                        onClick={() => handleCopy(result.hash, index)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        {copiedIndex === index ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <code className="block text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                      {uppercase ? result.hash.toUpperCase() : result.hash}
                    </code>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SEO Content Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">About Hash Functions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">What is a Hash Function?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  A cryptographic hash function takes an input (message) and produces a fixed-size string of bytes, typically a digest that appears random. The same input always produces the same hash, but even a small change creates a completely different output.
                </p>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Supported Algorithms</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li><strong>MD5:</strong> 128-bit hash (legacy, not for security)</li>
                  <li><strong>SHA-1:</strong> 160-bit hash (deprecated for security)</li>
                  <li><strong>SHA-256:</strong> 256-bit hash (widely used, secure)</li>
                  <li><strong>SHA-384:</strong> 384-bit hash (high security)</li>
                  <li><strong>SHA-512:</strong> 512-bit hash (highest security)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Common Use Cases</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>File integrity verification (checksums)</li>
                  <li>Password storage (with proper salting)</li>
                  <li>Digital signatures</li>
                  <li>Data deduplication</li>
                  <li>Blockchain and cryptocurrency</li>
                  <li>Certificate validation</li>
                </ul>
                <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Security Note:</strong> MD5 and SHA-1 are considered cryptographically broken. Use SHA-256 or higher for security-sensitive applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Algorithm Comparison */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Algorithm Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-600">
                      <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Algorithm</th>
                      <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Output Size</th>
                      <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Security</th>
                      <th className="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Speed</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-2 px-3">MD5</td>
                      <td className="py-2 px-3">128 bits</td>
                      <td className="py-2 px-3 text-red-600 dark:text-red-400">Broken</td>
                      <td className="py-2 px-3">Very Fast</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-2 px-3">SHA-1</td>
                      <td className="py-2 px-3">160 bits</td>
                      <td className="py-2 px-3 text-yellow-600 dark:text-yellow-400">Deprecated</td>
                      <td className="py-2 px-3">Fast</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-2 px-3">SHA-256</td>
                      <td className="py-2 px-3">256 bits</td>
                      <td className="py-2 px-3 text-green-600 dark:text-green-400">Secure</td>
                      <td className="py-2 px-3">Medium</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-2 px-3">SHA-384</td>
                      <td className="py-2 px-3">384 bits</td>
                      <td className="py-2 px-3 text-green-600 dark:text-green-400">Very Secure</td>
                      <td className="py-2 px-3">Medium</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">SHA-512</td>
                      <td className="py-2 px-3">512 bits</td>
                      <td className="py-2 px-3 text-green-600 dark:text-green-400">Highest</td>
                      <td className="py-2 px-3">Slower</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-5 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Can hash functions be reversed?</h3>
                <p>No, cryptographic hash functions are designed to be one-way. You cannot reverse a hash to get the original input. This is why they&apos;re used for password storage.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Why do I get the same hash for the same input?</h3>
                <p>Hash functions are deterministic - the same input will always produce the same output. This property makes them useful for data verification.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Which algorithm should I use?</h3>
                <p>For security purposes, use SHA-256 or higher. MD5 and SHA-1 are only suitable for non-security checksums or legacy compatibility.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Is my data safe?</h3>
                <p>Yes, all hash generation happens locally in your browser using the Web Crypto API. Your data never leaves your device.</p>
              </div>
            </div>
          </section>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/hash-generator" />
        </main>
      </div>
    </div>
  );
}
