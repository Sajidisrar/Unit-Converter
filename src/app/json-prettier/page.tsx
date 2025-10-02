'use client';

import { useState } from 'react';
import Head from 'next/head';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';

interface JsonNode {
  key?: string;
  value: unknown;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  expanded: boolean;
  level: number;
}

export default function JSONPrettier() {
  const [input, setInput] = useState('');
  const [jsonTree, setJsonTree] = useState<JsonNode[]>([]);
  const [error, setError] = useState('');
  const [formatted, setFormatted] = useState('');

  const parseJsonToTree = (obj: unknown, level = 0, key?: string): JsonNode[] => {
    const nodes: JsonNode[] = [];
    
    if (obj === null) {
      nodes.push({
        key,
        value: null,
        type: 'null',
        expanded: true,
        level
      });
    } else if (typeof obj === 'boolean') {
      nodes.push({
        key,
        value: obj,
        type: 'boolean',
        expanded: true,
        level
      });
    } else if (typeof obj === 'number') {
      nodes.push({
        key,
        value: obj,
        type: 'number',
        expanded: true,
        level
      });
    } else if (typeof obj === 'string') {
      nodes.push({
        key,
        value: obj,
        type: 'string',
        expanded: true,
        level
      });
    } else if (Array.isArray(obj)) {
      nodes.push({
        key,
        value: obj,
        type: 'array',
        expanded: true,
        level
      });
      
      (obj as unknown[]).forEach((item, index) => {
        nodes.push(...parseJsonToTree(item, level + 1, `[${index}]`));
      });
    } else if (typeof obj === 'object') {
      nodes.push({
        key,
        value: obj,
        type: 'object',
        expanded: true,
        level
      });
      
      Object.entries(obj as Record<string, unknown>).forEach(([objKey, objValue]) => {
        nodes.push(...parseJsonToTree(objValue, level + 1, objKey));
      });
    }
    
    return nodes;
  };

  const handleFormat = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      const prettified = JSON.stringify(parsed, null, 2);
      setFormatted(prettified);
      
      const tree = parseJsonToTree(parsed);
      setJsonTree(tree);
    } catch {
      setError('Invalid JSON format. Please check your JSON syntax.');
      setFormatted('');
      setJsonTree([]);
    }
  };

  const handleMinify = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setFormatted(minified);
      setJsonTree([]);
    } catch {
      setError('Invalid JSON format. Please check your JSON syntax.');
      setFormatted('');
      setJsonTree([]);
    }
  };

  const toggleExpanded = (index: number) => {
    const newTree = [...jsonTree];
    const node = newTree[index];
    
    if (node.type === 'object' || node.type === 'array') {
      node.expanded = !node.expanded;
      
      // Hide/show children
      let i = index + 1;
      while (i < newTree.length && newTree[i].level > node.level) {
        if (newTree[i].level === node.level + 1) {
          newTree[i].expanded = node.expanded;
        }
        i++;
      }
    }
    
    setJsonTree(newTree);
  };

  const handleClear = () => {
    setInput('');
    setFormatted('');
    setJsonTree([]);
    setError('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const expandAll = () => {
    const newTree = jsonTree.map(node => ({ ...node, expanded: true }));
    setJsonTree(newTree);
  };

  const collapseAll = () => {
    const newTree = jsonTree.map(node => ({ 
      ...node, 
      expanded: node.level === 0 || (node.type !== 'object' && node.type !== 'array')
    }));
    setJsonTree(newTree);
  };

  const renderValue = (node: JsonNode) => {
    switch (node.type) {
      case 'string':
        return <span className="text-green-600 dark:text-green-400">&quot;{String(node.value)}&quot;</span>;
      case 'number':
        return <span className="text-blue-600 dark:text-blue-400">{String(node.value)}</span>;
      case 'boolean':
        return <span className="text-purple-600 dark:text-purple-400">{String(node.value)}</span>;
      case 'null':
        return <span className="text-gray-500 dark:text-gray-400">null</span>;
      case 'array':
        return (
          <span className="text-gray-700 dark:text-gray-300">
            [{node.expanded ? '' : `...${(node.value as unknown[]).length} items`}]
          </span>
        );
      case 'object':
        const keys = Object.keys(node.value as Record<string, unknown>);
        return (
          <span className="text-gray-700 dark:text-gray-300">
            {`{${node.expanded ? '' : `...${keys.length} keys`}}`}
          </span>
        );
      default:
        return null;
    }
  };

  const renderTreeNode = (node: JsonNode, index: number) => {
    const indent = '  '.repeat(node.level);
    const isExpandable = node.type === 'object' || node.type === 'array';
    
    // Don't render children if parent is collapsed
    if (node.level > 0) {
      const parentIndex = jsonTree.findIndex((n, i) => i < index && n.level === node.level - 1);
      if (parentIndex !== -1 && !jsonTree[parentIndex].expanded) {
        return null;
      }
    }

    return (
      <div key={index} className="font-mono text-sm">
        <span className="text-gray-400 dark:text-gray-500">{indent}</span>
        {isExpandable && (
          <button
            onClick={() => toggleExpanded(index)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mr-1"
          >
            {node.expanded ? '▼' : '▶'}
          </button>
        )}
        {node.key && (
          <span className="text-blue-800 dark:text-blue-300">
            {node.key.startsWith('[') ? node.key : `"${node.key}"`}:
          </span>
        )}
        <span className="ml-1">{renderValue(node)}</span>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>JSON Prettier & Formatter - Free Online JSON Beautifier Tool</title>
        <meta name="description" content="Free online JSON prettier and formatter. Format, beautify, minify JSON data with expand/collapse tree view. Perfect for developers and data analysis." />
        <meta name="keywords" content="JSON prettier, JSON formatter, JSON beautifier, JSON minifier, JSON tree view, format JSON online, developer tools" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/json-prettier" />
        <meta property="og:title" content="JSON Prettier & Formatter - Free Online Tool" />
        <meta property="og:description" content="Format and beautify JSON data with interactive tree view using our free online JSON prettier tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/json-prettier" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              JSON Prettier & Formatter
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Format, beautify, and explore JSON data with interactive tree view. Perfect for developers, API testing, and data analysis.
            </p>
          </div>

          <main className="max-w-7xl mx-auto">
            <div className="mb-6">
              <AdBanner position="top" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 mb-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    JSON Input
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '400px',
                      height: Math.max(400, Math.min(600, (input.split('\n').length * 20) + 100)) + 'px'
                    }}
                    placeholder='Paste your JSON here...\n\nExample:\n{\n  "users": [\n    {"name": "John", "age": 30},\n    {"name": "Jane", "age": 25}\n  ],\n  "total": 2\n}'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {jsonTree.length > 0 ? 'Interactive Tree View' : 'Formatted Output'}
                    </label>
                    {jsonTree.length > 0 && (
                      <div className="flex space-x-2">
                        <button
                          onClick={expandAll}
                          className="px-3 py-1 bg-emerald-600 text-white rounded text-sm hover:bg-emerald-700 transition-colors"
                        >
                          Expand All
                        </button>
                        <button
                          onClick={collapseAll}
                          className="px-3 py-1 bg-teal-600 text-white rounded text-sm hover:bg-teal-700 transition-colors"
                        >
                          Collapse All
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 overflow-y-auto"
                       style={{ 
                         minHeight: '400px',
                         maxHeight: '600px'
                       }}>
                    {jsonTree.length > 0 ? (
                      <div className="space-y-1">
                        {jsonTree.map((node, index) => renderTreeNode(node, index))}
                      </div>
                    ) : (
                      <pre className="whitespace-pre-wrap text-gray-900 dark:text-white font-mono text-sm">
                        {formatted || 'Formatted JSON will appear here...'}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleFormat}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Format & Tree View
                </button>
                
                <button
                  onClick={handleMinify}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                >
                  Minify JSON
                </button>
                
                <button
                  onClick={handleCopy}
                  disabled={!formatted}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Copy Output
                </button>
                
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="mb-6">
              <AdBanner position="inline" />
            </div>

            {/* SEO Content Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">About JSON Formatting</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">JSON Prettier Features</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our JSON prettier tool helps developers format, beautify, and explore JSON data with an interactive tree view. Essential for API development, debugging, and data analysis in <strong>AI artificial Intelligence</strong> and <strong>Data Science</strong> workflows. Features expand/collapse functionality for better data visualization.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Related Developer Tools</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Enhance your workflow with our <a href="/json-to-csv" className="text-emerald-600 dark:text-emerald-400 hover:underline">json to csv</a> converter and <a href="/base64-encoder-decoder" className="text-emerald-600 dark:text-emerald-400 hover:underline">base64 encoding</a> tools. Also useful alongside <a href="/area" className="text-emerald-600 dark:text-emerald-400 hover:underline">Unit converter area</a> and <a href="/weight" className="text-emerald-600 dark:text-emerald-400 hover:underline">Unit converter weight</a> for applications processing measurement data in JSON format.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Pro Tip:</strong> Use the tree view to explore complex nested JSON structures, and the expand/collapse feature to focus on specific data sections during debugging.
                </p>
              </div>
            </section>

            {/* Developer Tools Navigation */}
            <DeveloperToolsNav currentPath="/json-prettier" />
          </main>
        </div>
      </div>
    </>
  );
}
