'use client';

import { ConversionType } from '@/types/conversions';
import { convertByType } from '@/utils/conversions';
import { useMemo, useState } from 'react';

interface Unit {
  label: string;
  value: string;
}

interface BulkConverterProps {
  units: Unit[];
  conversionType: ConversionType;
  defaultFrom?: string;
  defaultTo?: string;
}

// Refusing beyond this is better than silently truncating: a user pasting a
// long column would otherwise get a short answer with no indication why.
const MAX_VALUES = 5000;

interface Row {
  raw: string;
  value: number | null;
  result: number | null;
}

function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return '—';
  }

  if (value !== 0 && Math.abs(value) < 1e-4) {
    return value.toExponential(6);
  }

  return String(Number(value.toPrecision(10)));
}

/**
 * Converts a whole column of values at once -- the thing a search engine's
 * inline converter cannot do. Splits on newlines, commas, tabs and spaces so a
 * pasted spreadsheet column or a comma-separated list both work.
 */
export default function BulkConverter({
  units,
  conversionType,
  defaultFrom,
  defaultTo,
}: BulkConverterProps) {
  const [text, setText] = useState('');
  const [fromUnit, setFromUnit] = useState(defaultFrom || units[0]?.value || '');
  const [toUnit, setToUnit] = useState(defaultTo || units[1]?.value || units[0]?.value || '');
  const [copied, setCopied] = useState(false);

  const { rows, truncated } = useMemo(() => {
    const tokens = text
      .split(/[\n,\t;]+|\s+/)
      .map((token) => token.trim())
      .filter(Boolean);

    const limited = tokens.slice(0, MAX_VALUES);

    return {
      truncated: tokens.length > MAX_VALUES,
      rows: limited.map((raw): Row => {
        // Tolerate thousands separators, which spreadsheet copies often carry.
        const cleaned = raw.replace(/[_\s]/g, '');
        const value = Number(cleaned);
        const valid = cleaned !== '' && Number.isFinite(value);

        return {
          raw,
          value: valid ? value : null,
          result: valid ? convertByType(conversionType, value, fromUnit, toUnit) : null,
        };
      }),
    };
  }, [text, fromUnit, toUnit, conversionType]);

  const validRows = rows.filter((row) => row.result !== null);
  const invalidCount = rows.length - validRows.length;

  const resultsText = validRows.map((row) => formatResult(row.result as number)).join('\n');

  const copyResults = async () => {
    try {
      await navigator.clipboard.writeText(resultsText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const downloadCsv = () => {
    const header = `input_${fromUnit},output_${toUnit}\n`;
    const body = rows
      .map((row) => `${JSON.stringify(row.raw)},${row.result === null ? '' : formatResult(row.result)}`)
      .join('\n');
    const blob = new Blob([header + body], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `converted-${fromUnit}-to-${toUnit}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="card-panel p-6 sm:p-8">
      <p className="eyebrow mb-2">Bulk mode</p>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
        Convert a whole list at once
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Paste a column of values — one per line, or separated by commas, tabs or spaces.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="bulk-input" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
            Values
          </label>
          <textarea
            id="bulk-input"
            className="input font-mono text-sm"
            rows={12}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={'1\n2.5\n10\n42'}
            spellCheck={false}
          />
        </div>

        <div>
          <div className="flex items-end gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <label htmlFor="bulk-from" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
                From
              </label>
              <select
                id="bulk-from"
                className="input"
                value={fromUnit}
                onChange={(event) => setFromUnit(event.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>{unit.label}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={swap}
              aria-label="Swap the from and to units"
              title="Swap units"
              className="btn-ghost-outline shrink-0 h-[46px] w-[46px] grid place-items-center text-lg"
            >
              <span aria-hidden="true">⇄</span>
            </button>
            <div className="flex-1 min-w-0">
              <label htmlFor="bulk-to" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
                To
              </label>
              <select
                id="bulk-to"
                className="input"
                value={toUnit}
                onChange={(event) => setToUnit(event.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>{unit.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="card-nested max-h-[19rem] overflow-y-auto">
            {rows.length === 0 ? (
              <p className="p-4 text-sm text-gray-500 dark:text-gray-400">
                Results appear here as you paste.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[var(--surface-nested)]">
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th className="text-left py-2 px-3 font-medium text-gray-600 dark:text-gray-400">Input</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-600 dark:text-gray-400">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index} className="border-b border-[var(--border-subtle)] last:border-0">
                      <td className="py-1.5 px-3 font-mono text-gray-700 dark:text-gray-300">{row.raw}</td>
                      <td className="py-1.5 px-3 font-mono">
                        {row.result === null ? (
                          <span className="text-[var(--color-error-500)]">not a number</span>
                        ) : (
                          <span className="text-gray-900 dark:text-white">{formatResult(row.result)}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {rows.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" onClick={copyResults} className="btn-ghost-outline px-5 py-2.5">
            {copied ? 'Copied' : `Copy ${validRows.length} results`}
          </button>
          <button type="button" onClick={downloadCsv} className="btn-ghost-outline px-5 py-2.5">
            Download CSV
          </button>
          {invalidCount > 0 && (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {invalidCount} {invalidCount === 1 ? 'entry' : 'entries'} could not be read as a number
            </span>
          )}
          {truncated && (
            <span className="text-sm text-[var(--color-error-500)]">
              Only the first {MAX_VALUES.toLocaleString('en-GB')} values are converted.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
