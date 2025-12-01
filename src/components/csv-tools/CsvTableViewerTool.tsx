'use client';

import { useState, useMemo } from 'react';

export default function CsvTableViewerTool() {
  const [input, setInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState('');

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

  const parsedData = useMemo(() => {
    if (!input.trim()) return { headers: [], rows: [] };

    const allRows = parseCSV(input, delimiter);
    if (allRows.length === 0) return { headers: [], rows: [] };

    const maxCols = Math.max(...allRows.map(row => row.length));
    const normalizedRows = allRows.map(row => {
      const newRow = [...row];
      while (newRow.length < maxCols) newRow.push('');
      return newRow;
    });

    if (hasHeader) {
      const headers = normalizedRows[0].map((h, i) => h.trim() || `Column ${i + 1}`);
      return { headers, rows: normalizedRows.slice(1) };
    } else {
      const headers = Array.from({ length: maxCols }, (_, i) => `Column ${i + 1}`);
      return { headers, rows: normalizedRows };
    }
  }, [input, delimiter, hasHeader]);

  const filteredAndSortedRows = useMemo(() => {
    let rows = [...parsedData.rows];

    // Filter
    if (filterText.trim()) {
      const searchLower = filterText.toLowerCase();
      rows = rows.filter(row =>
        row.some(cell => cell.toLowerCase().includes(searchLower))
      );
    }

    // Sort
    if (sortColumn !== null) {
      rows.sort((a, b) => {
        const aVal = a[sortColumn] || '';
        const bVal = b[sortColumn] || '';

        // Try numeric sort
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
        }

        // String sort
        const comparison = aVal.localeCompare(bVal);
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return rows;
  }, [parsedData.rows, sortColumn, sortDirection, filterText]);

  const handleSort = (colIndex: number) => {
    if (sortColumn === colIndex) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(colIndex);
      setSortDirection('asc');
    }
  };

  const loadSample = () => {
    setInput(`name,age,email,department,salary
John Doe,30,john@example.com,Engineering,75000
Jane Smith,25,jane@example.com,Marketing,65000
Bob Johnson,35,bob@example.com,Engineering,85000
Alice Brown,28,alice@example.com,HR,55000
Charlie Wilson,42,charlie@example.com,Sales,70000
Diana Lee,31,diana@example.com,Engineering,80000
Eve Martinez,29,eve@example.com,Marketing,68000
Frank Garcia,38,frank@example.com,Sales,72000`);
  };

  const handleClear = () => {
    setInput('');
    setSortColumn(null);
    setSortDirection('asc');
    setFilterText('');
  };

  const stats = useMemo(() => {
    if (parsedData.rows.length === 0) return null;
    return {
      totalRows: parsedData.rows.length,
      totalColumns: parsedData.headers.length,
      filteredRows: filteredAndSortedRows.length,
    };
  }, [parsedData, filteredAndSortedRows]);

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
          First row is header
        </label>
      </div>

      {/* Input */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            CSV Input
          </label>
          <div className="flex gap-2">
            <button
              onClick={loadSample}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Load sample
            </button>
            <button
              onClick={handleClear}
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          className="w-full rounded-lg p-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y"
          style={{ minHeight: '150px' }}
          placeholder="Paste your CSV here to view as a table..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/* Table View */}
      {parsedData.headers.length > 0 && (
        <div className="space-y-4">
          {/* Filter and Stats */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[200px] max-w-md">
              <input
                type="text"
                placeholder="Filter rows..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            {stats && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filterText ? `${stats.filteredRows} of ${stats.totalRows}` : stats.totalRows} rows | {stats.totalColumns} columns
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-600">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                    #
                  </th>
                  {parsedData.headers.map((header, idx) => (
                    <th
                      key={idx}
                      onClick={() => handleSort(idx)}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {header}
                        {sortColumn === idx && (
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAndSortedRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={parsedData.headers.length + 1}
                      className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      {filterText ? 'No matching rows found' : 'No data rows'}
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedRows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-3 py-2 text-xs text-gray-400 dark:text-gray-500">
                        {rowIdx + 1}
                      </td>
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap"
                        >
                          {cell || <span className="text-gray-400 dark:text-gray-500 italic">empty</span>}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Click on column headers to sort. Use the filter to search all columns.
          </p>
        </div>
      )}

      {!input.trim() && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">Paste CSV data above to view as an interactive table</p>
          <p className="text-sm">Supports sorting, filtering, and various delimiters</p>
        </div>
      )}
    </div>
  );
}
