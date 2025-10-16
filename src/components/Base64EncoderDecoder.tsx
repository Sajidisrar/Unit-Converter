'use client';

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

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleEncode = () => {
    setOutput(base64Encode(input));
  };

  const handleDecode = () => {
    setOutput(base64Decode(input));
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Base64 Encoder & Decoder
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Encode text to Base64 or decode Base64 strings instantly. Perfect for web development and data transmission.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'encode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              mode === 'decode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={mode === 'encode' ? handleEncode : handleDecode}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
        </div>

        {output && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Base64 Encoded Result' : 'Decoded Text'}
            </label>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white resize-none"
              />
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
