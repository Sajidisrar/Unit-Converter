'use client';

import { useState } from 'react';

export default function CsvFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);

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

  const formatCSV = (rows: string[][], delim: string): string => {
    return rows.map(row =>
      row.map(field => {
        if (field.includes(delim) || field.includes('"') || field.includes('\n')) {
          return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
      }).join(delim)
    ).join('\n');
  };

  const handleFormat = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }

      const rows = parseCSV(input, delimiter);
      if (rows.length === 0) {
        setError('No valid CSV data found');
        return;
      }

      // Normalize column count
      const maxCols = Math.max(...rows.map(row => row.length));
      const normalizedRows = rows.map(row => {
        while (row.length < maxCols) row.push('');
        return row;
      });

      setOutput(formatCSV(normalizedRows, delimiter));
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid CSV';
      setError(`CSV Parse Error: ${errorMsg}`);
      setOutput('');
    }
  };

  const handleTrim = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }

      const rows = parseCSV(input, delimiter);
      const trimmedRows = rows.map(row => row.map(field => field.trim()));
      setOutput(formatCSV(trimmedRows, delimiter));
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid CSV';
      setError(`CSV Parse Error: ${errorMsg}`);
      setOutput('');
    }
  };

  const handleRemoveEmpty = () => {
    try {
      setError('');
      if (!input.trim()) {
        setOutput('');
        return;
      }

      const rows = parseCSV(input, delimiter);
      const filteredRows = rows.filter(row => row.some(field => field.trim() !== ''));

      if (hasHeader && filteredRows.length > 0) {
        const header = filteredRows[0];
        const dataRows = filteredRows.slice(1).filter(row =>
          row.some(field => field.trim() !== '')
        );
        setOutput(formatCSV([header, ...dataRows], delimiter));
      } else {
        setOutput(formatCSV(filteredRows, delimiter));
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid CSV';
      setError(`CSV Parse Error: ${errorMsg}`);
      setOutput('');
    }
  };

  const handleValidate = () => {
    try {
      setError('');
      if (!input.trim()) {
        setError('Please enter CSV to validate');
        return;
      }

      const rows = parseCSV(input, delimiter);
      if (rows.length === 0) {
        setError('No valid CSV data found');
        return;
      }

      const colCounts = rows.map(row => row.length);
      const isConsistent = colCounts.every(count => count === colCounts[0]);

      if (isConsistent) {
        setOutput(`✅ Valid CSV!\n\nRows: ${rows.length}\nColumns: ${colCounts[0]}\n${hasHeader ? 'Headers: ' + rows[0].join(', ') : ''}`);
      } else {
        setOutput(`⚠️ Inconsistent column count!\n\nRows with different column counts:\n${
          colCounts.map((count, idx) => `Row ${idx + 1}: ${count} columns`).join('\n')
        }`);
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Invalid CSV';
      setError(`❌ Invalid CSV: ${errorMsg}`);
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
    setInput(`name,age,email,city
John Doe,30,john@example.com,New York
Jane Smith,25,jane@example.com,Los Angeles
Bob Johnson,35,bob@example.com,Chicago
Alice Brown,28,alice@example.com,Houston
"Smith, Jr.",45,"special@example.com","San Francisco"`);
    setError('');
    setOutput('');
  };

  return (
    <div>
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
          Has header row
        </label>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              CSV Input
            </label>
            <button
              onClick={loadSample}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Load sample CSV
            </button>
          </div>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{ minHeight: '350px' }}
            placeholder="Paste your CSV here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
          </div>
          <textarea
            className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
            style={{ minHeight: '350px' }}
            readOnly
            value={output}
            placeholder="Formatted CSV will appear here..."
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
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Format CSV
        </button>
        <button
          onClick={handleTrim}
          disabled={!input.trim()}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Trim Whitespace
        </button>
        <button
          onClick={handleRemoveEmpty}
          disabled={!input.trim()}
          className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Remove Empty Rows
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
