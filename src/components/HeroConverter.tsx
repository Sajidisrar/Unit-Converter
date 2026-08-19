'use client';

import { CONVERSION_CATEGORIES, ConversionCategory } from '@/constants/conversionCategories';
import { convertByType } from '@/utils/conversions';
import Link from 'next/link';
import { useMemo, useState } from 'react';

function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return '—';
  }

  if (value !== 0 && Math.abs(value) < 1e-4) {
    return value.toExponential(4);
  }

  // Six significant figures keeps exact factors clean without showing
  // floating-point noise.
  return String(Number(value.toPrecision(6)));
}

function labelFor(category: ConversionCategory, unitValue: string): string {
  return category.units.find((unit) => unit.value === unitValue)?.label ?? unitValue;
}

export default function HeroConverter() {
  const [categoryId, setCategoryId] = useState(CONVERSION_CATEGORIES[0].id);
  const [rawValue, setRawValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(CONVERSION_CATEGORIES[0].defaultFrom);
  const [toUnit, setToUnit] = useState(CONVERSION_CATEGORIES[0].defaultTo);
  const [copied, setCopied] = useState(false);

  const category = useMemo(
    () => CONVERSION_CATEGORIES.find((entry) => entry.id === categoryId) ?? CONVERSION_CATEGORIES[0],
    [categoryId]
  );

  const parsed = Number(rawValue);
  const hasValue = rawValue.trim() !== '' && Number.isFinite(parsed);
  const result = hasValue ? convertByType(category.conversionType, parsed, fromUnit, toUnit) : null;

  const changeCategory = (nextId: string) => {
    const next = CONVERSION_CATEGORIES.find((entry) => entry.id === nextId) ?? CONVERSION_CATEGORIES[0];
    setCategoryId(next.id);
    // Units belong to a family, so they must reset with it.
    setFromUnit(next.defaultFrom);
    setToUnit(next.defaultTo);
    setCopied(false);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setCopied(false);
  };

  const copy = async () => {
    if (result === null) {
      return;
    }

    try {
      await navigator.clipboard.writeText(formatResult(result));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions policy; failing quietly is
      // better than throwing in the hero.
      setCopied(false);
    }
  };

  return (
    <div className="card-panel p-6 sm:p-8">
      <p className="eyebrow mb-2">Live converter</p>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
        {category.label} converter
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Pick a category, type a value, and the result updates as you type.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="hero-category" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
            Category
          </label>
          <select
            id="hero-category"
            className="input"
            value={categoryId}
            onChange={(event) => changeCategory(event.target.value)}
          >
            {CONVERSION_CATEGORIES.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.label} converter
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hero-value" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
            Value
          </label>
          <input
            id="hero-value"
            className="input"
            type="number"
            inputMode="decimal"
            value={rawValue}
            onChange={(event) => {
              setRawValue(event.target.value);
              setCopied(false);
            }}
            placeholder="Enter a number"
          />
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1 min-w-0">
            <label htmlFor="hero-from" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
              From
            </label>
            <select
              id="hero-from"
              className="input"
              value={fromUnit}
              onChange={(event) => { setFromUnit(event.target.value); setCopied(false); }}
            >
              {category.units.map((unit) => (
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
            <label htmlFor="hero-to" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
              To
            </label>
            <select
              id="hero-to"
              className="input"
              value={toUnit}
              onChange={(event) => { setToUnit(event.target.value); setCopied(false); }}
            >
              {category.units.map((unit) => (
                <option key={unit.value} value={unit.value}>{unit.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="result-panel p-5" aria-live="polite">
          {result === null ? (
            <p className="text-gray-600 dark:text-gray-400">Enter a value to convert.</p>
          ) : (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {rawValue} {labelFor(category, fromUnit)}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white break-words">
                {formatResult(result)}{' '}
                <span className="text-xl font-semibold">{labelFor(category, toUnit)}</span>
              </p>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copy}
            disabled={result === null}
            className="btn-ghost-outline px-5 py-2.5 disabled:opacity-50"
          >
            {copied ? 'Copied' : 'Copy result'}
          </button>
          <Link href={category.toolUrl} className="btn-ghost-outline px-5 py-2.5">
            Open full {category.label.toLowerCase()} tool
          </Link>
        </div>
      </div>
    </div>
  );
}
