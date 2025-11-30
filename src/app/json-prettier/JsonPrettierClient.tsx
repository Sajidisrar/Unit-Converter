'use client';

import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import { useState } from 'react';

interface JsonNode {
  key?: string;
  value: unknown;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  expanded: boolean;
  level: number;
}

const SAMPLE_JSON = `{
  "users": [
    { "id": 1, "name": "John Doe", "email": "john@example.com", "active": true },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "active": false }
  ],
  "metadata": {
    "total": 2,
    "page": 1,
    "perPage": 10
  },
  "timestamp": 1732920000
}`;

export default function JsonPrettierClient() {
  const [input, setInput] = useState('');
  const [jsonTree, setJsonTree] = useState<JsonNode[]>([]);
  const [error, setError] = useState('');
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [formatted, setFormatted] = useState('');
  const [stats, setStats] = useState<{ keys: number; depth: number; size: string } | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const parseJsonToTree = (obj: unknown, level = 0, key?: string): JsonNode[] => {
    const nodes: JsonNode[] = [];

    if (obj === null) {
      nodes.push({ key, value: null, type: 'null', expanded: true, level });
    } else if (typeof obj === 'boolean') {
      nodes.push({ key, value: obj, type: 'boolean', expanded: true, level });
    } else if (typeof obj === 'number') {
      nodes.push({ key, value: obj, type: 'number', expanded: true, level });
    } else if (typeof obj === 'string') {
      nodes.push({ key, value: obj, type: 'string', expanded: true, level });
    } else if (Array.isArray(obj)) {
      nodes.push({ key, value: obj, type: 'array', expanded: true, level });
      (obj as unknown[]).forEach((item, index) => {
        nodes.push(...parseJsonToTree(item, level + 1, `[${index}]`));
      });
    } else if (typeof obj === 'object') {
      nodes.push({ key, value: obj, type: 'object', expanded: true, level });
      Object.entries(obj as Record<string, unknown>).forEach(([objKey, objValue]) => {
        nodes.push(...parseJsonToTree(objValue, level + 1, objKey));
      });
    }

    return nodes;
  };

  const countKeys = (obj: unknown): number => {
    if (obj === null || typeof obj !== 'object') return 0;
    if (Array.isArray(obj)) {
      return obj.reduce((acc, item) => acc + countKeys(item), 0);
    }
    return Object.keys(obj).length + Object.values(obj).reduce((acc: number, val) => acc + countKeys(val), 0);
  };

  const getDepth = (obj: unknown, currentDepth = 0): number => {
    if (obj === null || typeof obj !== 'object') return currentDepth;
    if (Array.isArray(obj)) {
      return Math.max(currentDepth, ...obj.map(item => getDepth(item, currentDepth + 1)));
    }
    return Math.max(currentDepth, ...Object.values(obj).map(val => getDepth(val, currentDepth + 1)));
  };

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const findErrorLine = (jsonString: string, errorMessage: string): number | null => {
    const positionMatch = errorMessage.match(/position (\d+)/i);
    if (positionMatch) {
      const position = parseInt(positionMatch[1], 10);
      const beforeError = jsonString.substring(0, position);
      return beforeError.split('\n').length;
    }
    return null;
  };

  const handleFormat = () => {
    try {
      setError('');
      setErrorLine(null);
      const parsed = JSON.parse(input);
      const prettified = JSON.stringify(parsed, null, 2);
      setFormatted(prettified);

      const tree = parseJsonToTree(parsed);
      setJsonTree(tree);

      // Calculate stats
      setStats({
        keys: countKeys(parsed),
        depth: getDepth(parsed),
        size: formatBytes(new Blob([prettified]).size)
      });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(`JSON Parse Error: ${errorMsg}`);
      setErrorLine(findErrorLine(input, errorMsg));
      setFormatted('');
      setJsonTree([]);
      setStats(null);
    }
  };

  const handleMinify = () => {
    try {
      setError('');
      setErrorLine(null);
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setFormatted(minified);
      setJsonTree([]);
      setStats({
        keys: countKeys(parsed),
        depth: getDepth(parsed),
        size: formatBytes(new Blob([minified]).size)
      });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(`JSON Parse Error: ${errorMsg}`);
      setErrorLine(findErrorLine(input, errorMsg));
      setFormatted('');
      setJsonTree([]);
      setStats(null);
    }
  };

  const toggleExpanded = (index: number) => {
    const newTree = [...jsonTree];
    const node = newTree[index];

    if (node.type === 'object' || node.type === 'array') {
      node.expanded = !node.expanded;
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
    setErrorLine(null);
    setStats(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const loadSample = () => {
    setInput(SAMPLE_JSON);
    setError('');
    setErrorLine(null);
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

    if (node.level > 0) {
      const parentIndex = jsonTree.findIndex((n, i) => i < index && n.level === node.level - 1);
      if (parentIndex !== -1 && !jsonTree[parentIndex].expanded) {
        return null;
      }
    }

    return (
      <div key={index} className="font-mono text-sm leading-relaxed">
        <span className="text-gray-400 dark:text-gray-500">{indent}</span>
        {isExpandable && (
          <button
            onClick={() => toggleExpanded(index)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mr-1 w-4"
          >
            {node.expanded ? '▼' : '▶'}
          </button>
        )}
        {!isExpandable && <span className="w-4 inline-block"></span>}
        {node.key && (
          <span className="text-blue-800 dark:text-blue-300">
            {node.key.startsWith('[') ? node.key : `"${node.key}"`}:
          </span>
        )}
        <span className="ml-1">{renderValue(node)}</span>
      </div>
    );
  };

  const renderLineNumbers = (text: string) => {
    const lines = text.split('\n');
    return lines.map((_, i) => (
      <div
        key={i}
        className={`text-right pr-3 select-none ${errorLine === i + 1 ? 'bg-red-200 dark:bg-red-900/50 text-red-700 dark:text-red-300' : 'text-gray-400 dark:text-gray-500'}`}
      >
        {i + 1}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            JSON Formatter & Prettier
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Format, beautify, and explore JSON with interactive tree view. Validate syntax and analyze structure.
          </p>
        </header>

        {/* Main Tool - Full Width */}
        <main className="max-w-[1800px] mx-auto">
          {/* Ad Banner - Top */}
          <div className="mb-4">
            <AdBanner position="top" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6">
            {/* Stats Bar */}
            {stats && (
              <div className="flex flex-wrap gap-4 mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  <strong className="text-emerald-600 dark:text-emerald-400">{stats.keys}</strong> keys
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  <strong className="text-emerald-600 dark:text-emerald-400">{stats.depth}</strong> levels deep
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  <strong className="text-emerald-600 dark:text-emerald-400">{stats.size}</strong> size
                </span>
              </div>
            )}

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
              {/* Input Panel */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    JSON Input
                  </label>
                  <button
                    onClick={loadSample}
                    className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Load sample JSON
                  </button>
                </div>
                <div className="relative border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <div className="flex">
                    {/* Line Numbers */}
                    <div className="bg-gray-100 dark:bg-gray-700 text-xs font-mono py-4 min-w-[3rem] border-r border-gray-300 dark:border-gray-600">
                      {renderLineNumbers(input || '\n'.repeat(15))}
                    </div>
                    {/* Textarea */}
                    <textarea
                      className="flex-1 p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none"
                      style={{ minHeight: '400px' }}
                      placeholder="Paste your JSON here..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Output Panel */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {jsonTree.length > 0 ? 'Interactive Tree View' : 'Formatted Output'}
                  </label>
                  {jsonTree.length > 0 && (
                    <div className="flex gap-2">
                      <button
                        onClick={expandAll}
                        className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                      >
                        Expand All
                      </button>
                      <button
                        onClick={collapseAll}
                        className="text-xs px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded hover:bg-teal-200 dark:hover:bg-teal-900/50"
                      >
                        Collapse All
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 overflow-auto"
                  style={{ minHeight: '400px', maxHeight: '600px' }}
                >
                  {jsonTree.length > 0 ? (
                    <div className="space-y-0.5">
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

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
                {errorLine && (
                  <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                    Check line {errorLine} in your input
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleFormat}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Format & Tree View
              </button>
              <button
                onClick={handleMinify}
                className="px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Minify
              </button>
              <button
                onClick={handleCopy}
                disabled={!formatted}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {copiedText ? 'Copied!' : 'Copy Output'}
              </button>
              <button
                onClick={handleClear}
                className="px-5 py-2.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/json-prettier" />
        </main>
      </div>
    </div>
  );
}
