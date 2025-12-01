'use client';

import { useState } from 'react';

function jsonToCsv(jsonStr: string): string {
  try {
    let arr = JSON.parse(jsonStr);
    if (!Array.isArray(arr)) {
      if (typeof arr === 'object' && arr !== null) {
        arr = [arr];
      } else {
        return 'Input must be a JSON object or an array of objects';
      }
    }
    if (arr.length === 0 || typeof arr[0] !== 'object' || arr[0] === null) {
      return 'Input must be a JSON object or an array of objects';
    }

    const keys = Array.from(
      arr.reduce((set: Set<string>, obj: Record<string, unknown>) => {
        if (typeof obj === 'object' && obj !== null) {
          Object.keys(obj).forEach(k => set.add(k));
        }
        return set;
      }, new Set<string>())
    );

    const escape = (v: unknown) => {
      let str: string;
      if (typeof v === 'object' && v !== null) {
        str = JSON.stringify(v);
      } else {
        str = String(v);
      }
      if (typeof v === 'undefined' || v === null) {
        str = '';
      }
      if (str.includes('"')) {
        str = str.replace(/"/g, '""');
      }
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str}"`;
      }
      return str;
    };

    const header = keys.join(',');
    const rows = arr.map((obj: Record<string, string | number | boolean | null | undefined>) =>
      keys.map(k => escape(obj && typeof obj === 'object' ? obj[k as keyof typeof obj] : undefined)).join(',')
    );
    return [header, ...rows].join('\n');
  } catch {
    return 'Invalid JSON';
  }
}

export default function JsonToCsvTool() {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setCsvOutput(jsonToCsv(jsonInput));
  };

  const handleCopy = async () => {
    if (navigator && navigator.clipboard) {
      await navigator.clipboard.writeText(csvOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setJsonInput('');
    setCsvOutput('');
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JSON Input
          </label>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{
              minHeight: '300px',
              height: Math.max(300, Math.min(500, (jsonInput.split('\n').length * 20) + 100)) + 'px'
            }}
            placeholder='Paste your JSON here...

Example:
[
  {"name": "John", "age": 30, "city": "New York"},
  {"name": "Jane", "age": 25, "city": "Los Angeles"}
]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CSV Output
          </label>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{
              minHeight: '300px',
              height: Math.max(300, Math.min(500, (csvOutput.split('\n').length * 20) + 100)) + 'px'
            }}
            readOnly
            value={csvOutput}
            placeholder="CSV output will appear here..."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <button
          onClick={handleConvert}
          disabled={!jsonInput.trim()}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Convert to CSV
        </button>
        <button
          onClick={handleCopy}
          disabled={!csvOutput || csvOutput === 'Invalid JSON' || csvOutput.startsWith('Input must be')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {copied ? 'Copied!' : 'Copy CSV'}
        </button>
        <button
          onClick={handleDownload}
          disabled={!csvOutput || csvOutput === 'Invalid JSON' || csvOutput.startsWith('Input must be')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Download CSV
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Clear All
        </button>
      </div>

      {csvOutput && (csvOutput === 'Invalid JSON' || csvOutput.startsWith('Input must be')) && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-300 text-sm">{csvOutput}</p>
        </div>
      )}
    </div>
  );
}
