import { findIngredientByText } from './ingredients';

export interface ParsedLine {
  /** The original text, always preserved. */
  raw: string;
  quantity: number | null;
  /** Normalised to a cookingUnits value, or null when the line has no unit. */
  unit: string | null;
  /** Everything after the quantity and unit. */
  ingredient: string;
  /** Matching density-table entry, when one is recognised. */
  ingredientId: string | null;
  /** False when no quantity could be read -- the row still appears, for editing. */
  parsed: boolean;
  /** Set when the line gave a range like "2-3 tbsp" and the lower bound was taken. */
  note?: string;
}

const UNICODE_FRACTIONS: Record<string, number> = {
  '½': 0.5, '⅓': 1 / 3, '⅔': 2 / 3, '¼': 0.25, '¾': 0.75,
  '⅕': 0.2, '⅖': 0.4, '⅗': 0.6, '⅘': 0.8,
  '⅙': 1 / 6, '⅚': 5 / 6, '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875,
};

// Longest first, so "tablespoons" is not matched by "tbsp"'s shorter aliases
// and "fl oz" wins over "oz".
const UNIT_ALIASES: [string, string][] = [
  ['tablespoons', 'tbsp'], ['tablespoon', 'tbsp'], ['tbsps', 'tbsp'], ['tbsp', 'tbsp'], ['tbs', 'tbsp'],
  ['teaspoons', 'tsp'], ['teaspoon', 'tsp'], ['tsps', 'tsp'], ['tsp', 'tsp'],
  ['fluid ounces', 'fl oz'], ['fluid ounce', 'fl oz'], ['fl. oz.', 'fl oz'], ['fl oz', 'fl oz'], ['floz', 'fl oz'],
  ['millilitres', 'ml'], ['milliliters', 'ml'], ['millilitre', 'ml'], ['milliliter', 'ml'], ['ml', 'ml'],
  ['litres', 'l'], ['liters', 'l'], ['litre', 'l'], ['liter', 'l'],
  ['kilograms', 'kg'], ['kilogrammes', 'kg'], ['kilogram', 'kg'], ['kg', 'kg'],
  ['grams', 'g'], ['grammes', 'g'], ['gram', 'g'], ['gramme', 'g'], ['g', 'g'],
  ['pounds', 'lb'], ['pound', 'lb'], ['lbs', 'lb'], ['lb', 'lb'],
  ['ounces', 'oz'], ['ounce', 'oz'], ['oz', 'oz'],
  ['cups', 'cup'], ['cup', 'cup'],
  ['l', 'l'],
];

const FRACTION_CHARS = '½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞';

// Ordered longest-match-first. A bare fraction has to be tried before a plain
// number, or "1/2" reads as 1 and the "/2" is left behind as part of the unit.
const QUANTITY_PATTERNS: RegExp[] = [
  new RegExp(`^\\d+\\s+\\d+\\s*/\\s*\\d+`),          // 1 1/2
  new RegExp(`^\\d+\\s*/\\s*\\d+`),                      // 1/2
  new RegExp(`^\\d+(?:\\.\\d+)?\\s*[${FRACTION_CHARS}]`), // 1½
  new RegExp(`^[${FRACTION_CHARS}]`),                            // ½
  new RegExp(`^\\d+(?:\\.\\d+)?`),                         // 1 or 1.5
];

/** Parse "1", "1.5", "1/2", "1 1/2", "½", "1½" into a number. */
function parseQuantity(text: string): number | null {
  const trimmed = text.trim();

  const mixed = trimmed.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixed) {
    const denominator = Number(mixed[3]);
    return denominator === 0 ? null : Number(mixed[1]) + Number(mixed[2]) / denominator;
  }

  const fraction = trimmed.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (fraction) {
    const denominator = Number(fraction[2]);
    return denominator === 0 ? null : Number(fraction[1]) / denominator;
  }

  const withUnicode = trimmed.match(new RegExp(`^(\\d+(?:\\.\\d+)?)?\\s*([${FRACTION_CHARS}])$`));
  if (withUnicode) {
    return (withUnicode[1] ? Number(withUnicode[1]) : 0) + UNICODE_FRACTIONS[withUnicode[2]];
  }

  const plain = trimmed.match(/^\d+(?:\.\d+)?$/);
  if (plain) {
    return Number(plain[0]);
  }

  return null;
}

function matchQuantity(text: string): { value: number; rest: string } | null {
  for (const pattern of QUANTITY_PATTERNS) {
    const match = text.match(pattern);

    if (match) {
      const value = parseQuantity(match[0]);

      if (value !== null) {
        return { value, rest: text.slice(match[0].length).replace(/^[\s.]+/, '') };
      }
    }
  }

  return null;
}

function matchUnit(text: string): { unit: string; rest: string } | null {
  const lower = text.toLowerCase();

  for (const [alias, unit] of UNIT_ALIASES) {
    // Must be followed by a word boundary so "gram" does not match "granola".
    if (lower.startsWith(alias) && !/[a-z]/.test(lower.charAt(alias.length))) {
      return { unit, rest: text.slice(alias.length).replace(/^[\s.]+/, '') };
    }
  }

  return null;
}

/**
 * Parse a pasted ingredient list, one item per line.
 *
 * A line that cannot be understood is still returned, with parsed: false, so
 * the UI can show it for correction. Dropping an ingredient from a recipe
 * someone is cooking from is the worst thing this could do.
 */
export function parseRecipe(text: string): ParsedLine[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map(parseLine);
}

export function parseLine(raw: string): ParsedLine {
  // Strip list markers people paste in from websites.
  const line = raw.replace(/^[-•*•]\s*/, '').trim();

  const base: ParsedLine = {
    raw,
    quantity: null,
    unit: null,
    ingredient: line,
    ingredientId: findIngredientByText(line)?.id ?? null,
    parsed: false,
  };

  // A range such as "2-3 tbsp": take the lower bound and say so.
  const range = line.match(/^(\d+(?:\.\d+)?)\s*[-–—]\s*(\d+(?:\.\d+)?)\s+/);
  let working = line;
  let note: string | undefined;

  if (range) {
    working = `${range[1]} ${line.slice(range[0].length)}`;
    note = `Range ${range[1]}–${range[2]} in the original; using ${range[1]}.`;
  }

  const quantityMatch = matchQuantity(working);

  if (!quantityMatch) {
    return { ...base, note };
  }

  const quantity = quantityMatch.value;
  const afterQuantity = quantityMatch.rest;
  const unitMatch = matchUnit(afterQuantity);
  const ingredient = (unitMatch ? unitMatch.rest : afterQuantity).trim();

  return {
    raw,
    quantity,
    unit: unitMatch?.unit ?? null,
    ingredient,
    ingredientId: findIngredientByText(ingredient)?.id ?? null,
    parsed: true,
    note,
  };
}

// Fractions a cook can actually measure. 1/3 and 2/3 are included because
// measuring spoons and cups come in thirds.
const COOKABLE: [number, string][] = [
  [0, ''], [0.125, '⅛'], [0.25, '¼'], [1 / 3, '⅓'], [0.375, '⅜'], [0.5, '½'],
  [0.625, '⅝'], [2 / 3, '⅔'], [0.75, '¾'], [0.875, '⅞'], [1, ''],
];

/**
 * Render a scaled amount as something you could measure.
 *
 * "0.6666666666666666 cups" is technically correct and useless in a kitchen;
 * this gives "⅔". Values above 10 round to whole numbers, since eighths of a
 * cup stop mattering at that scale.
 */
export function formatQuantity(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return '0';
  }

  if (value === 0) {
    return '0';
  }

  if (value >= 10) {
    return String(Math.round(value));
  }

  const whole = Math.floor(value);
  const remainder = value - whole;

  let closest = COOKABLE[0];
  for (const candidate of COOKABLE) {
    if (Math.abs(candidate[0] - remainder) < Math.abs(closest[0] - remainder)) {
      closest = candidate;
    }
  }

  // Too far from any cookable fraction to pretend otherwise.
  if (Math.abs(closest[0] - remainder) > 0.04) {
    return String(Number(value.toFixed(2)));
  }

  const carried = closest[0] === 1 ? whole + 1 : whole;
  const fraction = closest[0] === 1 ? '' : closest[1];

  if (fraction === '') {
    return String(carried);
  }

  return carried === 0 ? fraction : `${carried}${fraction}`;
}
