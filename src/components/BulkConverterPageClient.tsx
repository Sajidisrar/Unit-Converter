'use client';

import BulkConverter from '@/components/BulkConverter';
import { CONVERSION_CATEGORIES } from '@/constants/conversionCategories';
import { useState } from 'react';

/**
 * Category picker in front of the shared BulkConverter, so one page covers
 * every unit family. Reuses CONVERSION_CATEGORIES rather than declaring its
 * own list, which is also what the homepage hero converter uses.
 */
export default function BulkConverterPageClient() {
  const [categoryId, setCategoryId] = useState(CONVERSION_CATEGORIES[0].id);
  const category =
    CONVERSION_CATEGORIES.find((entry) => entry.id === categoryId) ?? CONVERSION_CATEGORIES[0];

  return (
    <div className="space-y-4">
      <div className="card-panel p-6 sm:p-8">
        <label htmlFor="bulk-category" className="block text-sm text-gray-600 dark:text-gray-400 mb-1.5">
          What are you converting?
        </label>
        <select
          id="bulk-category"
          className="input"
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          {CONVERSION_CATEGORIES.map((entry) => (
            <option key={entry.id} value={entry.id}>{entry.label}</option>
          ))}
        </select>
      </div>

      {/* Remounted per category so the unit selects reset to that family's
          defaults rather than holding a unit that no longer exists. */}
      <BulkConverter
        key={category.id}
        units={category.units}
        conversionType={category.conversionType}
        defaultFrom={category.defaultFrom}
        defaultTo={category.defaultTo}
      />
    </div>
  );
}
