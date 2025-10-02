'use client';

import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';


export default function JsonParser() {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedData, setParsedData] = useState<unknown>(null);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [stats, setStats] = useState({
    size: 0,
    keys: 0,
    depth: 0,
    arrays: 0,
    objects: 0
  });
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const calculateDepth = useCallback((obj: unknown, currentDepth = 0): number => {
    if (typeof obj !== 'object' || obj === null) return currentDepth;
    
    let maxDepth = currentDepth;
    if (Array.isArray(obj)) {
      for (const item of obj) {
        maxDepth = Math.max(maxDepth, calculateDepth(item, currentDepth + 1));
      }
    } else {
      for (const value of Object.values(obj as Record<string, unknown>)) {
        maxDepth = Math.max(maxDepth, calculateDepth(value, currentDepth + 1));
      }
    }
    return maxDepth;
  }, []);

  const countElements = (obj: unknown): { keys: number; arrays: number; objects: number } => {
    let keys = 0;
    let arrays = 0;
    let objects = 0;

    const traverse = (item: unknown) => {
      if (Array.isArray(item)) {
        arrays++;
        item.forEach(traverse);
      } else if (typeof item === 'object' && item !== null) {
        objects++;
        const entries = Object.entries(item as Record<string, unknown>);
        keys += entries.length;
        entries.forEach(([, value]) => traverse(value));
      }
    };

    traverse(obj);
    return { keys, arrays, objects };
  };

  const parseJson = useCallback(() => {
    if (!jsonInput.trim()) {
      setError('');
      setIsValid(null);
      setParsedData(null);
      setStats({ size: 0, keys: 0, depth: 0, arrays: 0, objects: 0 });
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      setParsedData(parsed);
      setError('');
      setIsValid(true);

      const { keys, arrays, objects } = countElements(parsed);
      setStats({
        size: new Blob([jsonInput]).size,
        keys,
        depth: calculateDepth(parsed),
        arrays,
        objects
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
      setIsValid(false);
      setParsedData(null);
      setStats({ size: 0, keys: 0, depth: 0, arrays: 0, objects: 0 });
    }
  }, [jsonInput, calculateDepth]);

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const renderJsonTree = (data: unknown, path = '', depth = 0): React.ReactElement[] => {
    if (typeof data !== 'object' || data === null) {
      return [
        <div key={path} className="ml-4 text-sm">
          <span className="text-blue-600 dark:text-blue-400">
            {typeof data === 'string' ? `"${data}"` : String(data)}
          </span>
          <span className="text-gray-500 ml-2 text-xs">({typeof data})</span>
        </div>
      ];
    }

    const elements: React.ReactElement[] = [];
    
    if (Array.isArray(data)) {
      const isExpanded = expandedNodes.has(path);
      elements.push(
        <div key={path} className="ml-4">
          <button
            onClick={() => toggleNode(path)}
            className="flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-1"
          >
            <span className="mr-1">
              {isExpanded ? '▼' : '▶'}
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              Array[{data.length}]
            </span>
          </button>
          {isExpanded && (
            <div className="ml-4 border-l border-gray-200 dark:border-gray-600 pl-2">
              {data.map((item, index) => (
                <div key={`${path}[${index}]`}>
                  <div className="text-xs text-gray-500 mb-1">[{index}]:</div>
                  {renderJsonTree(item, `${path}[${index}]`, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else {
      const entries = Object.entries(data as Record<string, unknown>);
      const isExpanded = expandedNodes.has(path);
      
      elements.push(
        <div key={path} className="ml-4">
          <button
            onClick={() => toggleNode(path)}
            className="flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-1"
          >
            <span className="mr-1">
              {isExpanded ? '▼' : '▶'}
            </span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              Object{'{' + entries.length + '}'}
            </span>
          </button>
          {isExpanded && (
            <div className="ml-4 border-l border-gray-200 dark:border-gray-600 pl-2">
              {entries.map(([key, value]) => (
                <div key={`${path}.${key}`} className="mb-2">
                  <div className="text-sm">
                    <span className="text-orange-600 dark:text-orange-400 font-medium">&quot;{key}&quot;</span>
                    <span className="text-gray-500 mx-2">:</span>
                  </div>
                  {renderJsonTree(value, `${path}.${key}`, depth + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return elements;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatJson = () => {
    if (parsedData !== null) {
      const formatted = JSON.stringify(parsedData, null, 2);
      setJsonInput(formatted);
    }
  };

  const minifyJson = () => {
    if (parsedData !== null) {
      const minified = JSON.stringify(parsedData);
      setJsonInput(minified);
    }
  };

  const clearInput = () => {
    setJsonInput('');
    setParsedData(null);
    setError('');
    setIsValid(null);
    setStats({ size: 0, keys: 0, depth: 0, arrays: 0, objects: 0 });
    setExpandedNodes(new Set());
  };

  const expandAll = () => {
    const allPaths = new Set<string>();
    const collectPaths = (data: unknown, path = '') => {
      if (typeof data === 'object' && data !== null) {
        allPaths.add(path);
        if (Array.isArray(data)) {
          data.forEach((item, index) => collectPaths(item, `${path}[${index}]`));
        } else {
          Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
            collectPaths(value, `${path}.${key}`);
          });
        }
      }
    };
    if (parsedData !== null) {
      collectPaths(parsedData);
      setExpandedNodes(allPaths);
    }
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  return (
    <>
      <Head>
        <title>JSON Parser & Validator - Parse, Validate & Analyze JSON Data Online</title>
        <meta name="description" content="Free online JSON parser and validator. Parse, validate, format, and analyze JSON data with interactive tree view. Perfect for developers, API testing, and data analysis." />
        <meta name="keywords" content="JSON parser, JSON validator, JSON formatter, parse JSON, validate JSON, JSON tree view, JSON analyzer, developer tools, API testing" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/json-parser" />
        <meta property="og:title" content="JSON Parser & Validator - Parse JSON Data Online" />
        <meta property="og:description" content="Free online JSON parser and validator with interactive tree view and analysis tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/json-parser" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              JSON Parser & Validator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Parse, validate, format, and analyze JSON data with our interactive tree view and comprehensive analysis tools.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 mb-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Input Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    JSON Input
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={clearInput}
                      className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => copyToClipboard(jsonInput)}
                      disabled={!jsonInput}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <textarea
                  className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                  style={{ 
                    minHeight: '300px',
                    height: Math.max(300, Math.min(500, (jsonInput.split('\n').length * 20) + 80)) + 'px'
                  }}
                  placeholder='Enter JSON data here, e.g.:
{
  "name": "John Doe",
  "age": 30,
  "skills": ["JavaScript", "React", "Node.js"],
  "address": {
    "city": "New York",
    "country": "USA"
  }
}'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />

                {/* Parse Button */}
                <div className="mt-3 text-center">
                  <button
                    onClick={parseJson}
                    disabled={!jsonInput.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Parse JSON
                  </button>
                </div>

                {/* Status Indicator */}
                {isValid !== null && (
                  <div className={`mt-3 p-3 rounded-lg ${isValid ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}>
                    <div className="flex items-center">
                      <span className={`mr-2 ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {isValid ? '✓' : '✗'}
                      </span>
                      <span className={`font-medium ${isValid ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                        {isValid ? 'Valid JSON' : 'Invalid JSON'}
                      </span>
                    </div>
                    {error && (
                      <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                        {error}
                      </div>
                    )}
                  </div>
                )}

                {/* JSON Statistics */}
                {isValid && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">JSON Statistics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Size:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{stats.size} bytes</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Keys:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{stats.keys}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Depth:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{stats.depth}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Objects:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{stats.objects}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Arrays:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">{stats.arrays}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tree View Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Interactive Tree View
                  </label>
                  {parsedData !== null && (
                    <div className="flex space-x-2">
                      <button
                        onClick={expandAll}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        Expand All
                      </button>
                      <button
                        onClick={collapseAll}
                        className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition-colors"
                      >
                        Collapse All
                      </button>
                    </div>
                  )}
                </div>
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 min-h-[300px] max-h-[500px] overflow-auto">
                  {parsedData !== null ? (
                    <div className="font-mono text-sm">
                      {renderJsonTree(parsedData, 'root')}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                      {error ? 'Fix JSON errors to see tree view' : 'Enter valid JSON to see interactive tree view'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isValid && (
              <div className="flex flex-wrap gap-3 mt-6 justify-center">
                <button
                  onClick={formatJson}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Format JSON
                </button>
                <button
                  onClick={minifyJson}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Minify JSON
                </button>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(parsedData, null, 2))}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Copy Formatted
                </button>
              </div>
            )}
          </div>

          <div className="mb-6">
            <AdBanner position="inline" />
          </div>

          {/* SEO Content Section */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">About JSON Parser & Validator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">What is JSON?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format. It&apos;s easy for humans to read and write, and easy for machines to parse and generate. JSON is widely used in web applications, APIs, and configuration files.
                </p>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Key Features</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Real-time JSON validation</li>
                  <li>Interactive tree view with expand/collapse</li>
                  <li>Detailed statistics and analysis</li>
                  <li>Format and minify JSON data</li>
                  <li>Copy and paste functionality</li>
                  <li>Error highlighting and messages</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Common Use Cases</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                  <li>API response validation and testing</li>
                  <li>Configuration file validation</li>
                  <li>Data structure analysis</li>
                  <li>JSON formatting and cleanup</li>
                  <li>Learning JSON structure</li>
                  <li>Debugging JSON data issues</li>
                </ul>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Pro Tip:</strong> Use the tree view to navigate complex nested JSON structures easily. Click on objects and arrays to expand or collapse them for better visualization.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <DeveloperToolsNav currentPath="/json-parser" />
        </div>
      </div>
    </>
  );
}
