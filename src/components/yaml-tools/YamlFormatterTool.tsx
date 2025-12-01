'use client';

import { useState } from 'react';
import * as yaml from 'js-yaml';

export default function YamlFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const handleFormat = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const parsed = yaml.load(input);
      const formatted = yaml.dump(parsed, {
        indent: indentSize,
        lineWidth: -1,
        noRefs: true,
        sortKeys: false
      });
      setOutput(formatted);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid YAML';
      setError(`YAML Parse Error: ${errorMsg}`);
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const parsed = yaml.load(input);
      const minified = yaml.dump(parsed, {
        indent: 0,
        lineWidth: -1,
        noRefs: true,
        flowLevel: 0
      });
      setOutput(minified.replace(/\n\s*/g, ' ').trim());
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid YAML';
      setError(`YAML Parse Error: ${errorMsg}`);
      setOutput('');
    }
  };

  const handleValidate = () => {
    try {
      setError('');
      if (!input.trim()) {
        setError('Please enter YAML to validate');
        return;
      }
      yaml.load(input);
      setOutput('✅ Valid YAML!');
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid YAML';
      setError(`❌ Invalid YAML: ${errorMsg}`);
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
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

  const loadSample = () => {
    setInput(`# Sample YAML Configuration
server:
  host: localhost
  port: 8080
  ssl: true

database:
  type: postgresql
  connection:
    host: db.example.com
    port: 5432
    name: myapp
  credentials:
    username: admin
    password: secret123

features:
  - authentication
  - logging
  - caching

settings:
  debug: false
  max_connections: 100
  timeout: 30s`);
    setError('');
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              YAML Input
            </label>
            <button
              onClick={loadSample}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              Load sample YAML
            </button>
          </div>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{ minHeight: '350px' }}
            placeholder="Paste your YAML here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Indent:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
              </select>
            </div>
          </div>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{ minHeight: '350px' }}
            readOnly
            value={output}
            placeholder="Formatted YAML will appear here..."
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <button
          onClick={handleFormat}
          disabled={!input.trim()}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Format YAML
        </button>
        <button
          onClick={handleMinify}
          disabled={!input.trim()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Minify
        </button>
        <button
          onClick={handleValidate}
          disabled={!input.trim()}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Validate
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
          Clear All
        </button>
      </div>
    </div>
  );
}
