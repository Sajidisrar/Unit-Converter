import { describe, expect, it } from 'vitest';
import { formatQuantity, parseLine, parseRecipe } from './recipeParser';

describe('parseLine — quantities', () => {
  it('reads a whole number', () => {
    const line = parseLine('2 cups flour');
    expect(line.quantity).toBe(2);
    expect(line.unit).toBe('cup');
    expect(line.ingredient).toBe('flour');
    expect(line.parsed).toBe(true);
  });

  it('reads a decimal', () => {
    expect(parseLine('1.5 cups milk').quantity).toBeCloseTo(1.5, 9);
  });

  it('reads a bare fraction', () => {
    expect(parseLine('1/2 cup butter').quantity).toBeCloseTo(0.5, 9);
  });

  it('reads a mixed number', () => {
    expect(parseLine('1 1/2 cups sugar').quantity).toBeCloseTo(1.5, 9);
  });

  it('reads a unicode fraction', () => {
    expect(parseLine('½ tsp salt').quantity).toBeCloseTo(0.5, 9);
    expect(parseLine('⅔ cup oats').quantity).toBeCloseTo(2 / 3, 9);
  });

  it('reads a whole number joined to a unicode fraction', () => {
    expect(parseLine('1½ cups flour').quantity).toBeCloseTo(1.5, 9);
  });

  it('takes the lower bound of a range and says so', () => {
    const line = parseLine('2-3 tbsp olive oil');
    expect(line.quantity).toBe(2);
    expect(line.unit).toBe('tbsp');
    expect(line.note).toMatch(/2/);
  });
});

describe('parseLine — units', () => {
  it.each([
    ['2 tablespoons honey', 'tbsp'],
    ['2 tbsp honey', 'tbsp'],
    ['1 teaspoon salt', 'tsp'],
    ['1 tsp salt', 'tsp'],
    ['200 grams butter', 'g'],
    ['200g butter', 'g'],
    ['1 kg flour', 'kg'],
    ['8 oz cream cheese', 'oz'],
    ['1 lb beef', 'lb'],
    ['250 ml milk', 'ml'],
    ['1 litre water', 'l'],
    ['4 fl oz cream', 'fl oz'],
    ['3 cups rice', 'cup'],
  ])('normalises %s', (input, expected) => {
    expect(parseLine(input).unit).toBe(expected);
  });

  it('does not mistake a word starting with a unit for that unit', () => {
    // "granola" begins with "g"; it must not be read as grams.
    const line = parseLine('2 granola bars');
    expect(line.unit).toBeNull();
    expect(line.ingredient).toBe('granola bars');
  });
});

describe('parseLine — lines without a full quantity and unit', () => {
  it('keeps an item that has a quantity but no unit', () => {
    const line = parseLine('2 large eggs');
    expect(line.parsed).toBe(true);
    expect(line.quantity).toBe(2);
    expect(line.unit).toBeNull();
    expect(line.ingredient).toBe('large eggs');
  });

  it('keeps an item with no quantity at all, flagged for editing', () => {
    const line = parseLine('salt to taste');
    expect(line.parsed).toBe(false);
    expect(line.quantity).toBeNull();
    expect(line.raw).toBe('salt to taste');
    expect(line.ingredient).toBe('salt to taste');
  });

  it('strips list bullets', () => {
    expect(parseLine('- 2 cups flour').ingredient).toBe('flour');
    expect(parseLine('• 1 tsp salt').unit).toBe('tsp');
  });
});

describe('parseLine — ingredient matching', () => {
  it('links a known ingredient to the density table', () => {
    expect(parseLine('2 cups flour').ingredientId).toBe('flour');
    expect(parseLine('1 cup brown sugar').ingredientId).toBe('brown-sugar');
  });

  it('leaves ingredientId null when nothing matches', () => {
    expect(parseLine('2 large eggs').ingredientId).toBeNull();
  });
});

describe('parseRecipe', () => {
  const recipe = `2 cups flour
1 1/2 tsp baking powder
½ cup butter
200g caster sugar
2 large eggs

salt to taste`;

  it('returns one row per non-empty line and drops nothing', () => {
    const lines = parseRecipe(recipe);
    expect(lines).toHaveLength(6);
    expect(lines.map((line) => line.raw)).toContain('salt to taste');
  });

  it('marks only the unparseable line as needing attention', () => {
    const unparsed = parseRecipe(recipe).filter((line) => !line.parsed);
    expect(unparsed).toHaveLength(1);
    expect(unparsed[0].raw).toBe('salt to taste');
  });
});

describe('formatQuantity', () => {
  it.each([
    [0.5, '½'],
    [0.25, '¼'],
    [2 / 3, '⅔'],
    [1 / 3, '⅓'],
    [0.75, '¾'],
    [1.5, '1½'],
    [2.25, '2¼'],
    [3, '3'],
    [1, '1'],
  ])('renders %s as %s', (value, expected) => {
    expect(formatQuantity(value)).toBe(expected);
  });

  it('snaps a scaled third to a measurable fraction', () => {
    // 2 cups scaled by 1/3 -- the case that produces 0.6666666666666666.
    expect(formatQuantity(2 * (1 / 3))).toBe('⅔');
  });

  it('carries up when the remainder rounds to a whole', () => {
    expect(formatQuantity(1.99)).toBe('2');
  });

  it('falls back to a decimal when nothing cookable is close', () => {
    expect(formatQuantity(1.17)).toBe('1.17');
  });

  it('rounds to whole numbers at larger amounts', () => {
    expect(formatQuantity(12.4)).toBe('12');
  });

  it('handles zero and nonsense safely', () => {
    expect(formatQuantity(0)).toBe('0');
    expect(formatQuantity(Number.NaN)).toBe('0');
    expect(formatQuantity(-1)).toBe('0');
  });
});
