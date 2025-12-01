'use client';

import { useState } from 'react';

type ConversionMode = 'csv-to-json' | 'json-to-csv';

export default function CsvJsonConverterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<ConversionMode>('csv-to-json');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);
  const [indentSize, setIndentSize] = useState(2);

  const parseCSV = (text: string, delim: string): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentField = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (inQuotes) {
        if (char === '"' && nextChar === '"') {
          currentField += '"';
          i++;
        } else if (char === '"') {
          inQuotes = false;
        } else {
          currentField += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === delim) {
          currentRow.push(currentField);
          currentField = '';
        } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
          currentRow.push(currentField);
          if (currentRow.some(field => field.trim() !== '')) {
            rows.push(currentRow);
          }
          currentRow = [];
          currentField = '';
          if (char === '\r') i++;
        } else if (char !== '\r') {
          currentField += char;
        }
      }
    }

    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField);
      if (currentRow.some(field => field.trim() !== '')) {
        rows.push(currentRow);
      }
    }

    return rows;
  };

  const csvToJson = (text: string): object[] => {
    const rows = parseCSV(text, delimiter);
    if (rows.length === 0) return [];

    if (hasHeader) {
      const headers = rows[0];
      return rows.slice(1).map(row => {
        const obj: Record<string, string> = {};
        headers.forEach((header, idx) => {
          obj[header.trim() || `column${idx + 1}`] = row[idx] || '';
        });
        return obj;
      });
    } else {
      return rows.map(row => {
        const obj: Record<string, string> = {};
        row.forEach((field, idx) => {
          obj[`column${idx + 1}`] = field;
        });
        return obj;
      });
    }
  };

  const jsonToCsv = (data: unknown): string => {
    if (!Array.isArray(data)) {
      if (typeof data === 'object' && data !== null) {
        data = [data];
      } else {
        throw new Error('JSON must be an array of objects or a single object');
      }
    }

    const arr = data as Record<string, unknown>[];
    if (arr.length === 0) return '';

    const headers = [...new Set(arr.flatMap(obj => Object.keys(obj)))];

    const escapeField = (field: unknown): string => {
      const str = String(field ?? '');
      if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = arr.map(obj =>
      headers.map(header => escapeField(obj[header])).join(delimiter)
    );

    if (hasHeader) {
      return [headers.join(delimiter), ...rows].join('\n');
    }
    return rows.join('\n');
  };

  const handleConvert = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }

      if (mode === 'csv-to-json') {
        const json = csvToJson(input);
        setOutput(JSON.stringify(json, null, indentSize));
      } else {
        const parsed = JSON.parse(input);
        const csv = jsonToCsv(parsed);
        setOutput(csv);
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Conversion failed';
      setError(`Error: ${errorMsg}`);
      setOutput('');
    }
  };

  const handleSwap = () => {
    setMode(mode === 'csv-to-json' ? 'json-to-csv' : 'csv-to-json');
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

  const loadSampleCsv = () => {
    setMode('csv-to-json');
    setInput(`name,age,email,active
John Doe,30,john@example.com,true
Jane Smith,25,jane@example.com,true
Bob Johnson,35,bob@example.com,false`);
    setError('');
    setOutput('');
  };

  const loadSampleJson = () => {
    setMode('json-to-csv');
    setInput(`[
  {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "active": true
  },
  {
    "name": "Jane Smith",
    "age": 25,
    "email": "jane@example.com",
    "active": true
  },
  {
    "name": "Bob Johnson",
    "age": 35,
    "email": "bob@example.com",
    "active": false
  }
]`);
    setError('');
    setOutput('');
  };

  return (
    <div>
      {/* Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 p-1 bg-gray-100 dark:bg-gray-700">
          <button
            onClick={() => { setMode('csv-to-json'); setOutput(''); setError(''); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'csv-to-json'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            CSV → JSON
          </button>
          <button
            onClick={() => { setMode('json-to-csv'); setOutput(''); setError(''); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'json-to-csv'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            JSON → CSV
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Delimiter:</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
            className="rounded border-gray-300"
          />
          {mode === 'csv-to-json' ? 'First row is header' : 'Include header row'}
        </label>
        {mode === 'csv-to-json' && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">JSON Indent:</label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'csv-to-json' ? 'CSV Input' : 'JSON Input'}
            </label>
            <button
              onClick={mode === 'csv-to-json' ? loadSampleCsv : loadSampleJson}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Load sample
            </button>
          </div>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{ minHeight: '350px' }}
            placeholder={mode === 'csv-to-json' ? 'Paste your CSV here...' : 'Paste your JSON here...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {mode === 'csv-to-json' ? 'JSON Output' : 'CSV Output'}
            </label>
          </div>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{ minHeight: '350px' }}
            readOnly
            value={output}
            placeholder={mode === 'csv-to-json' ? 'JSON output will appear here...' : 'CSV output will appear here...'}
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
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Convert
        </button>
        <button
          onClick={handleSwap}
          disabled={!output}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Swap & Convert Back
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
