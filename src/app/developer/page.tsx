'use client';

import { useState } from 'react';
import { tools } from '@/utils/tool';
import DeveloperTools from '@/components/developerTools';

export default function ToolSelector() {
  const [selectedToolIndex, setSelectedToolIndex] = useState(0);
  const selectedTool = tools[selectedToolIndex];

  return (
    <div className="flex flex-1 h-full">
      <aside className="w-64 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-y-auto">
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
      <section className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ml-6 p-6 flex flex-col">
        <h2 className="text-3xl font-semibold mb-4">{selectedTool.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedTool.description}</p>
        <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 text-lg italic select-none">
          <DeveloperTools tool={selectedTool} />
        </div>
      </section>
    </div>
  );
}