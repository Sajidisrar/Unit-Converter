'use client';

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

function urlEncodeAll(input: string) {
  try {
    return Array.from(input)
      .map(char => '%' + char.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase())
      .join('');
  } catch {
    return 'Invalid input';
  }
}

export default function UrlEncoderTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [encodeMode, setEncodeMode] = useState<'standard' | 'all'>('standard');

  const handleEncode = () => {
    if (encodeMode === 'all') {
      setOutput(urlEncodeAll(input));
    } else {
      setOutput(urlEncode(input));
    }
  };

  const handleDecode = () => {
    setOutput(urlDecode(input));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const loadSample = () => {
    setInput('Hello World! Special chars: <>&"\'?=+ and spaces');
  };

  return (
    <div>
      {/* Options */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 p-1 bg-gray-100 dark:bg-gray-700">
          <button
            onClick={() => setEncodeMode('standard')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              encodeMode === 'standard'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Standard Encode
          </button>
          <button
            onClick={() => setEncodeMode('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              encodeMode === 'all'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Encode All Characters
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Input URL or Text
            </label>
            <button
              onClick={loadSample}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              Load sample
            </button>
          </div>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{ minHeight: '200px' }}
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
            style={{ minHeight: '200px' }}
            readOnly
            value={output}
            placeholder="Encoded/decoded output will appear here..."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <button
          onClick={handleEncode}
          disabled={!input.trim()}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Encode URL
        </button>
        <button
          onClick={handleDecode}
          disabled={!input.trim()}
          className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Decode URL
        </button>
        <button
          onClick={handleCopy}
          disabled={!output}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {copied ? 'Copied!' : 'Copy Output'}
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Clear
        </button>
      </div>

      {/* Common Encoded Characters Reference */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="font-medium text-gray-800 dark:text-white mb-3">Common URL Encoded Characters</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Space</span><code className="text-purple-600 dark:text-purple-400">%20</code></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">&amp;</span><code className="text-purple-600 dark:text-purple-400">%26</code></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">=</span><code className="text-purple-600 dark:text-purple-400">%3D</code></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">?</span><code className="text-purple-600 dark:text-purple-400">%3F</code></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">+</span><code className="text-purple-600 dark:text-purple-400">%2B</code></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">/</span><code className="text-purple-600 dark:text-purple-400">%2F</code></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">#</span><code className="text-purple-600 dark:text-purple-400">%23</code></div>
          <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">%</span><code className="text-purple-600 dark:text-purple-400">%25</code></div>
        </div>
      </div>
    </div>
  );
}
