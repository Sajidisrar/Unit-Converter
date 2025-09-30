'use client';

import { useState } from 'react';
import { tools } from '@/utils/tool';
import DeveloperTools from '@/components/developerTools';
import Head from 'next/head';

export default function ToolSelector() {
  const [selectedToolIndex, setSelectedToolIndex] = useState(0);
  const selectedTool = tools[selectedToolIndex];

  return (
    <>
      <Head>
        <title>Developer Tools - Base64, JSON, URL, JWT, Number Base Converter | Free Online Tools</title>
        <meta name="description" content="Free online developer tools including Base64 Encoder/Decoder, JSON Formatter/Minifier, URL Encoder/Decoder, Unix Timestamp Converter, JWT Decoder, Number Base Converter, and Text to ASCII conversion." />
        <meta name="keywords" content="developer tools, Base64 encoder, JSON formatter, URL encoder, JWT decoder, Unix timestamp, number base converter, ASCII converter, free online tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/developer" />
        <meta property="og:title" content="Developer Tools - Base64, JSON, URL, JWT Converter" />
        <meta property="og:description" content="Free online developer tools for Base64, JSON, URL, JWT, and more. Essential utilities for developers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/developer" />
      </Head>
      <div className="flex flex-1 min-h-screen flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-y-auto mb-4 md:mb-0">
        <h1 className="text-2xl font-bold p-4 border-b border-gray-200 dark:border-gray-700">Developer Tools</h1>
        <ul>
          {tools.map((tool, index) => (
            <li key={tool.title}>
              <button
                onClick={() => setSelectedToolIndex(index)}
                className={`w-full text-left px-4 py-3 border-l-4 transition-colors ${
                  index === selectedToolIndex
                    ? `border-blue-600 bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-400 font-semibold`
                    : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-blue-400'
                }`}
              >
                {tool.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 md:ml-6 p-4 md:p-6 flex flex-col">
        <h2 className="text-3xl font-semibold mb-4">{selectedTool.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedTool.description}</p>
        <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 text-lg italic select-none">
          <DeveloperTools tool={selectedTool} />
        </div>
      </section>
      </div>
    </>
  );
}