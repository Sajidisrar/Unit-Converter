'use client';

import { useState } from 'react';
import * as yaml from 'js-yaml';

type ConversionMode = 'yaml-to-json' | 'json-to-yaml';

export default function YamlJsonConverterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<ConversionMode>('yaml-to-json');
  const [indentSize, setIndentSize] = useState(2);

  const handleConvert = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }

      if (mode === 'yaml-to-json') {
        const parsed = yaml.load(input);
        const json = JSON.stringify(parsed, null, indentSize);
        setOutput(json);
      } else {
        const parsed = JSON.parse(input);
        const yamlOutput = yaml.dump(parsed, {
          indent: indentSize,
          lineWidth: -1,
          noRefs: true
        });
        setOutput(yamlOutput);
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Conversion failed';
      setError(`Error: ${errorMsg}`);
      setOutput('');
    }
  };

  const handleSwap = () => {
    setMode(mode === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json');
    setInput(output);
    setOutput('');
    setError('');
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

  const loadSampleYaml = () => {
    setMode('yaml-to-json');
    setInput(`# Sample YAML
name: John Doe
age: 30
email: john@example.com
address:
  street: 123 Main St
  city: New York
  country: USA
hobbies:
  - reading
  - coding
  - gaming
active: true`);
    setError('');
    setOutput('');
  };

  const loadSampleJson = () => {
    setMode('json-to-yaml');
    setInput(`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "coding", "gaming"],
  "active": true
}`);
    setError('');
    setOutput('');
  };

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 p-1 bg-gray-100 dark:bg-gray-700">
          <button
            onClick={() => { setMode('yaml-to-json'); setOutput(''); setError(''); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'yaml-to-json'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            YAML → JSON
          </button>
          <button
            onClick={() => { setMode('json-to-yaml'); setOutput(''); setError(''); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'json-to-yaml'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            JSON → YAML
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'yaml-to-json' ? 'YAML Input' : 'JSON Input'}
            </label>
            <button
              onClick={mode === 'yaml-to-json' ? loadSampleYaml : loadSampleJson}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              Load sample
            </button>
          </div>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{ minHeight: '350px' }}
            placeholder={mode === 'yaml-to-json' ? 'Paste your YAML here...' : 'Paste your JSON here...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'yaml-to-json' ? 'JSON Output' : 'YAML Output'}
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
            placeholder={mode === 'yaml-to-json' ? 'JSON output will appear here...' : 'YAML output will appear here...'}
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
          onClick={handleConvert}
          disabled={!input.trim()}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Convert
        </button>
        <button
          onClick={handleSwap}
          disabled={!output}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          ↔ Swap & Convert Back
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
