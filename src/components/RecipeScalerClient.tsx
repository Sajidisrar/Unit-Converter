'use client';

import { cookingUnits, isCookingMassUnit } from '@/utils/conversions';
import { convertCookingWithDensity } from '@/utils/ingredients';
import { formatQuantity, ParsedLine, parseRecipe } from '@/utils/recipeParser';
import { useMemo, useState } from 'react';

const SAMPLE = `2 cups plain flour
1 1/2 tsp baking powder
½ cup butter
200g caster sugar
2 large eggs
120ml milk
salt to taste`;

interface EditableRow extends ParsedLine {
  id: number;
}

function unitLabel(unit: string | null): string {
  if (!unit) {
    return '';
  }

  return cookingUnits.find((entry) => entry.value === unit)?.label.replace(/\s*\(.*\)$/, '') ?? unit;
}

/**
 * Short form for the scaled output line, e.g. "1½ cups flour".
 * Only "cup" pluralises -- g, ml, tsp and tbsp are abbreviations and do not.
 */
function shortUnit(unit: string | null, quantity: number): string {
  if (!unit) {
    return '';
  }

  return unit === 'cup' && Math.abs(quantity - 1) > 1e-9 ? ' cups' : ` ${unit}`;
}

export default function RecipeScalerClient() {
  const [text, setText] = useState('');
  const [fromServings, setFromServings] = useState('4');
  const [toServings, setToServings] = useState('8');
  const [toGrams, setToGrams] = useState(false);
  const [rows, setRows] = useState<EditableRow[] | null>(null);
  const [copied, setCopied] = useState(false);

  const scale = useMemo(() => {
    const from = Number(fromServings);
    const to = Number(toServings);

    return from > 0 && to > 0 ? to / from : 1;
  }, [fromServings, toServings]);

  const parse = (source: string) => {
    setRows(parseRecipe(source).map((line, index) => ({ ...line, id: index })));
    setCopied(false);
  };

  const updateRow = (id: number, patch: Partial<EditableRow>) => {
    setRows((current) =>
      current?.map((row) => (row.id === id ? { ...row, ...patch, parsed: true } : row)) ?? null
    );
    setCopied(false);
  };

  const scaledLine = (row: EditableRow): string => {
    if (row.quantity === null) {
      // No quantity to scale -- "salt to taste" survives untouched.
      return row.raw;
    }

    const scaled = row.quantity * scale;

    // Convert volumes to grams when asked and the ingredient is recognised.
    if (toGrams && row.unit && !isCookingMassUnit(row.unit) && row.ingredientId) {
      const grams = convertCookingWithDensity(scaled, row.unit, 'g', row.ingredientId);
      return `${Math.round(grams)} g ${row.ingredient}`.trim();
    }

    return `${formatQuantity(scaled)}${shortUnit(row.unit, scaled)} ${row.ingredient}`.trim();
  };

  const scaledText = rows?.map(scaledLine).join('\n') ?? '';
  const unparsedCount = rows?.filter((row) => !row.parsed).length ?? 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(scaledText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="card-panel p-6 sm:p-8 print:hidden">
        <label htmlFor="recipe-input" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
          Paste your ingredient list
        </label>
        <textarea
          id="recipe-input"
          className="input font-mono text-sm"
          rows={8}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={SAMPLE}
          spellCheck={false}
        />

        <div className="flex flex-wrap items-end gap-3 mt-4">
          <div className="w-28">
            <label htmlFor="from-servings" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
              Serves
            </label>
            <input
              id="from-servings"
              className="input"
              type="number"
              min="1"
              value={fromServings}
              onChange={(event) => setFromServings(event.target.value)}
            />
          </div>
          <div className="w-28">
            <label htmlFor="to-servings" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
              Scale to
            </label>
            <input
              id="to-servings"
              className="input"
              type="number"
              min="1"
              value={toServings}
              onChange={(event) => setToServings(event.target.value)}
            />
          </div>
          <button type="button" onClick={() => parse(text)} className="btn-accent px-6 py-3">
            Scale recipe
          </button>
          <button
            type="button"
            onClick={() => { setText(SAMPLE); parse(SAMPLE); }}
            className="btn-ghost-outline px-5 py-3"
          >
            Try the example
          </button>
        </div>
      </div>

      {rows && rows.length > 0 && (
        <>
          <div className="card-panel p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <p className="eyebrow mb-1">Scaled ×{Number(scale.toFixed(3))}</p>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {fromServings} → {toServings} servings
                </h2>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 print:hidden">
                <input
                  type="checkbox"
                  checked={toGrams}
                  onChange={(event) => setToGrams(event.target.checked)}
                  className="h-4 w-4"
                />
                Convert volumes to grams
              </label>
            </div>

            {unparsedCount > 0 && (
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 print:hidden">
                {unparsedCount} {unparsedCount === 1 ? 'line has' : 'lines have'} no quantity to scale.
                They are kept exactly as written — fill in an amount below if one is needed.
              </p>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-left">
                    <th className="py-2 pr-3 font-medium text-gray-600 dark:text-gray-400 print:hidden">Amount</th>
                    <th className="py-2 pr-3 font-medium text-gray-600 dark:text-gray-400 print:hidden">Unit</th>
                    <th className="py-2 pr-3 font-medium text-gray-600 dark:text-gray-400 print:hidden">Ingredient</th>
                    <th className="py-2 pr-3 font-medium text-gray-600 dark:text-gray-400">Scaled</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      className={`border-b border-[var(--border-subtle)] last:border-0 ${
                        row.quantity === null ? 'bg-[var(--surface-nested)]' : ''
                      }`}
                    >
                      <td className="py-2 pr-3 print:hidden">
                        <input
                          className="input py-1.5 px-2 w-24"
                          type="number"
                          step="any"
                          value={row.quantity ?? ''}
                          placeholder="—"
                          aria-label={`Amount for ${row.ingredient}`}
                          onChange={(event) =>
                            updateRow(row.id, {
                              quantity: event.target.value === '' ? null : Number(event.target.value),
                            })
                          }
                        />
                      </td>
                      <td className="py-2 pr-3 print:hidden">
                        <select
                          className="input py-1.5 px-2 w-32"
                          value={row.unit ?? ''}
                          aria-label={`Unit for ${row.ingredient}`}
                          onChange={(event) => updateRow(row.id, { unit: event.target.value || null })}
                        >
                          <option value="">(none)</option>
                          {cookingUnits.map((unit) => (
                            <option key={unit.value} value={unit.value}>{unitLabel(unit.value)}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 pr-3 print:hidden">
                        <input
                          className="input py-1.5 px-2 min-w-[10rem]"
                          value={row.ingredient}
                          aria-label="Ingredient name"
                          onChange={(event) => updateRow(row.id, { ingredient: event.target.value })}
                        />
                      </td>
                      <td className="py-2 pr-3 font-medium text-gray-900 dark:text-white">
                        {scaledLine(row)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-wrap gap-3 print:hidden">
              <button type="button" onClick={copy} className="btn-ghost-outline px-5 py-2.5">
                {copied ? 'Copied' : 'Copy scaled recipe'}
              </button>
              <button type="button" onClick={() => window.print()} className="btn-ghost-outline px-5 py-2.5">
                Print
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
