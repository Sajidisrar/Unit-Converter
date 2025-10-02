'use client';

import { useState } from 'react';
import Head from 'next/head';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';

interface DiffResult {
  path: string;
  type: 'added' | 'removed' | 'changed';
  oldValue?: unknown;
  newValue?: unknown;
}

export default function JSONCompare() {
  const [leftJson, setLeftJson] = useState('');
  const [rightJson, setRightJson] = useState('');
  const [differences, setDifferences] = useState<DiffResult[]>([]);
  const [error, setError] = useState('');
  const [isEqual, setIsEqual] = useState<boolean | null>(null);

  const compareObjects = (obj1: unknown, obj2: unknown, path = ''): DiffResult[] => {
    const diffs: DiffResult[] = [];
    
    const allKeys = new Set([
      ...Object.keys((obj1 as Record<string, unknown>) || {}), 
      ...Object.keys((obj2 as Record<string, unknown>) || {})
    ]);
    
    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      const val1 = (obj1 as Record<string, unknown>)?.[key];
      const val2 = (obj2 as Record<string, unknown>)?.[key];
      
      if (!(key in ((obj1 as Record<string, unknown>) || {}))) {
        diffs.push({
          path: currentPath,
          type: 'added',
          newValue: val2
        });
      } else if (!(key in ((obj2 as Record<string, unknown>) || {}))) {
        diffs.push({
          path: currentPath,
          type: 'removed',
          oldValue: val1
        });
      } else if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
        if (Array.isArray(val1) && Array.isArray(val2)) {
          // Compare arrays
          const maxLength = Math.max(val1.length, val2.length);
          for (let i = 0; i < maxLength; i++) {
            const arrayPath = `${currentPath}[${i}]`;
            if (i >= val1.length) {
              diffs.push({
                path: arrayPath,
                type: 'added',
                newValue: val2[i]
              });
            } else if (i >= val2.length) {
              diffs.push({
                path: arrayPath,
                type: 'removed',
                oldValue: val1[i]
              });
            } else if (typeof val1[i] === 'object' && typeof val2[i] === 'object') {
              diffs.push(...compareObjects(val1[i], val2[i], arrayPath));
            } else if (val1[i] !== val2[i]) {
              diffs.push({
                path: arrayPath,
                type: 'changed',
                oldValue: val1[i],
                newValue: val2[i]
              });
            }
          }
        } else {
          diffs.push(...compareObjects(val1, val2, currentPath));
        }
      } else if (val1 !== val2) {
        diffs.push({
          path: currentPath,
          type: 'changed',
          oldValue: val1,
          newValue: val2
        });
      }
    }
    
    return diffs;
  };

  const handleCompare = () => {
    try {
      setError('');
      
      if (!leftJson.trim() || !rightJson.trim()) {
        setError('Please provide both JSON inputs to compare.');
        return;
      }
      
      const parsed1 = JSON.parse(leftJson);
      const parsed2 = JSON.parse(rightJson);
      
      const diffs = compareObjects(parsed1, parsed2);
      setDifferences(diffs);
      setIsEqual(diffs.length === 0);
      
    } catch {
      setError('Invalid JSON format. Please check your JSON syntax.');
      setDifferences([]);
      setIsEqual(null);
    }
  };

  const handleClear = () => {
    setLeftJson('');
    setRightJson('');
    setDifferences([]);
    setError('');
    setIsEqual(null);
  };

  const formatValue = (value: unknown): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const renderHighlightedJson = (jsonString: string, side: 'left' | 'right') => {
    try {
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      const lines = formatted.split('\n');
      
      return lines.map((line, index) => {
        let hasChange = false;
        let changeType = '';
        
        // Check if this line has any differences
        for (const diff of differences) {
          const pathParts = diff.path.split('.');
          const lineContent = line.trim();
          
          // Simple heuristic to match lines with changes
          if (pathParts.some(part => lineContent.includes(`"${part}"`))) {
            hasChange = true;
            if (side === 'left') {
              changeType = diff.type === 'removed' ? 'removed' : diff.type === 'changed' ? 'changed' : '';
            } else {
              changeType = diff.type === 'added' ? 'added' : diff.type === 'changed' ? 'changed' : '';
            }
            break;
          }
        }
        
        const className = hasChange 
          ? changeType === 'removed' 
            ? 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200' 
            : changeType === 'added'
            ? 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200'
            : changeType === 'changed'
            ? side === 'left' 
              ? 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200'
              : 'bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-200'
            : ''
          : '';
        
        return (
          <div key={index} className={`${className} ${hasChange ? 'px-1 rounded' : ''}`}>
            {line}
          </div>
        );
      });
    } catch {
      return <span className="text-red-500">Invalid JSON</span>;
    }
  };

  const getDiffColor = (type: string) => {
    switch (type) {
      case 'added': return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
      case 'removed': return 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700';
      case 'changed': return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700';
      default: return 'bg-gray-100 dark:bg-gray-900/30 border-gray-300 dark:border-gray-700';
    }
  };

  return (
    <>
      <Head>
        <title>JSON Compare Tool - Free Online JSON Diff Checker</title>
        <meta name="description" content="Free online JSON compare tool. Compare two JSON objects and find differences instantly. Perfect for developers, API testing, and data validation." />
        <meta name="keywords" content="JSON compare, JSON diff, JSON difference checker, compare JSON online, JSON validator, developer tools, API testing" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeunitconvertor.com/json-compare" />
        <meta property="og:title" content="JSON Compare Tool - Free Online JSON Diff Checker" />
        <meta property="og:description" content="Compare two JSON objects and find differences instantly with our free online JSON compare tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeunitconvertor.com/json-compare" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              JSON Compare Tool
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Compare two JSON objects and find differences instantly. Perfect for API testing, data validation, and debugging.
            </p>
          </div>

          <main className="max-w-7xl mx-auto">
            <div className="mb-6">
              <AdBanner position="top" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    JSON 1 (Left)
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '300px',
                      height: Math.max(300, Math.min(500, (leftJson.split('\n').length * 20) + 100)) + 'px'
                    }}
                    placeholder='Paste your first JSON here...\n\nExample:\n{\n  "name": "John",\n  "age": 30\n}'
                    value={leftJson}
                    onChange={(e) => setLeftJson(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    JSON 2 (Right)
                  </label>
                  <textarea
                    className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
                    style={{ 
                      minHeight: '300px',
                      height: Math.max(300, Math.min(500, (rightJson.split('\n').length * 20) + 100)) + 'px'
                    }}
                    placeholder='Paste your second JSON here...\n\nExample:\n{\n  "name": "Jane",\n  "age": 25\n}'
                    value={rightJson}
                    onChange={(e) => setRightJson(e.target.value)}
                  />
                </div>
              </div>

              {/* Visual Diff Display */}
              {isEqual !== null && differences.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Visual Comparison</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        JSON 1 with Highlights
                      </label>
                      <div className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-mono text-sm min-h-[200px] max-h-[400px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-gray-900 dark:text-white">
                          {renderHighlightedJson(leftJson, 'left')}
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        JSON 2 with Highlights
                      </label>
                      <div className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-mono text-sm min-h-[200px] max-h-[400px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-gray-900 dark:text-white">
                          {renderHighlightedJson(rightJson, 'right')}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <button
                  onClick={handleCompare}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Compare JSON
                </button>
                
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Results Section */}
              {isEqual !== null && (
                <div className="mt-6">
                  <div className={`p-4 rounded-lg border ${isEqual ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700' : 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700'}`}>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      Comparison Result
                    </h3>
                    <p className={`${isEqual ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                      {isEqual ? '✅ The JSON objects are identical!' : `❌ Found ${differences.length} difference(s)`}
                    </p>
                  </div>
                  
                  {differences.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Differences Found:</h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {differences.map((diff, index) => (
                          <div key={index} className={`p-4 rounded-lg border ${getDiffColor(diff.type)}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-mono text-sm font-semibold text-gray-800 dark:text-white">
                                  {diff.path}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                    diff.type === 'added' ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200' :
                                    diff.type === 'removed' ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200' :
                                    'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                                  }`}>
                                    {diff.type.toUpperCase()}
                                  </span>
                                </div>
                                {diff.type === 'changed' && (
                                  <div className="mt-2 text-sm">
                                    <div className="text-red-600 dark:text-red-400">
                                      <span className="font-medium">Old:</span> {formatValue(diff.oldValue)}
                                    </div>
                                    <div className="text-green-600 dark:text-green-400">
                                      <span className="font-medium">New:</span> {formatValue(diff.newValue)}
                                    </div>
                                  </div>
                                )}
                                {diff.type === 'added' && (
                                  <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                                    <span className="font-medium">Added:</span> {formatValue(diff.newValue)}
                                  </div>
                                )}
                                {diff.type === 'removed' && (
                                  <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                                    <span className="font-medium">Removed:</span> {formatValue(diff.oldValue)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-6">
              <AdBanner position="inline" />
            </div>

            {/* SEO Content Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">About JSON Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">JSON Compare Features</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our JSON compare tool helps developers identify differences between JSON objects quickly. Essential for API testing, data validation, and debugging in <strong>AI artificial Intelligence</strong> and <strong>Data Science</strong> workflows. Compare configuration files, API responses, and data structures with precision.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Related Developer Tools</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Enhance your workflow with our <a href="/json-to-csv" className="text-red-600 dark:text-red-400 hover:underline">json to csv</a> converter and <a href="/base64-encoder-decoder" className="text-red-600 dark:text-red-400 hover:underline">base64 encoding</a> tools. Also useful alongside <a href="/area" className="text-red-600 dark:text-red-400 hover:underline">Unit converter area</a> and <a href="/weight" className="text-red-600 dark:text-red-400 hover:underline">Unit converter weight</a> for applications processing measurement data.
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Pro Tip:</strong> Use JSON compare to validate API responses, check configuration changes, and ensure data integrity across different environments.
                </p>
              </div>
            </section>

            {/* Developer Tools Navigation */}
            <DeveloperToolsNav currentPath="/json-compare" />
          </main>
        </div>
      </div>
    </>
  );
}
