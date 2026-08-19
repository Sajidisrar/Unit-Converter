import { describe, expect, it } from 'vitest';
import { convertCooking } from './conversions';
import {
  convertCookingWithDensity,
  findIngredientByText,
  getIngredient,
  ingredients,
} from './ingredients';

// The published per-cup weights these densities encode. Asserting against
// these rather than against current output is the point: the previous code
// returned 240 g for a cup of flour and was self-consistently wrong.
const CUP_WEIGHTS: [string, number][] = [
  ['water', 240],
  ['flour', 120],
  ['sugar', 200],
  ['butter', 227],
  ['honey', 340],
  ['oats', 90],
  ['brown-sugar', 220],
  ['icing-sugar', 120],
  ['cocoa', 100],
  ['rice', 185],
];

describe('ingredient densities', () => {
  it.each(CUP_WEIGHTS)('one cup of %s weighs about %d g', (id, grams) => {
    expect(convertCookingWithDensity(1, 'cup', 'g', id)).toBeCloseTo(grams, 0);
  });

  it('treats a cup of flour as half the weight of a cup of water', () => {
    const flour = convertCookingWithDensity(1, 'cup', 'g', 'flour');
    const water = convertCookingWithDensity(1, 'cup', 'g', 'water');
    expect(flour).toBeCloseTo(water / 2, 6);
  });

  it('makes honey heavier than water, as a syrup should be', () => {
    expect(convertCookingWithDensity(1, 'cup', 'g', 'honey'))
      .toBeGreaterThan(convertCookingWithDensity(1, 'cup', 'g', 'water'));
  });

  it('round-trips grams to cups and back', () => {
    const cups = convertCookingWithDensity(120, 'g', 'cup', 'flour');
    expect(cups).toBeCloseTo(1, 9);
    expect(convertCookingWithDensity(cups, 'cup', 'g', 'flour')).toBeCloseTo(120, 9);
  });

  it('every ingredient has a positive density and at least one alias', () => {
    for (const entry of ingredients) {
      expect(entry.density).toBeGreaterThan(0);
      expect(entry.aliases.length).toBeGreaterThan(0);
    }
  });
});

describe('density is irrelevant to same-dimension conversions', () => {
  it('volume to volume ignores the ingredient', () => {
    const asFlour = convertCookingWithDensity(1, 'cup', 'ml', 'flour');
    const asHoney = convertCookingWithDensity(1, 'cup', 'ml', 'honey');
    expect(asFlour).toBeCloseTo(240, 9);
    expect(asFlour).toBeCloseTo(asHoney, 9);
  });

  it('mass to mass ignores the ingredient', () => {
    expect(convertCookingWithDensity(1, 'kg', 'g', 'flour')).toBeCloseTo(1000, 9);
    expect(convertCookingWithDensity(1, 'lb', 'oz', 'honey')).toBeCloseTo(16, 9);
  });
});

describe('regression: existing volume conversions are unchanged', () => {
  it('keeps the previous results for volume-only conversions', () => {
    expect(convertCooking(1, 'l', 'ml')).toBeCloseTo(1000, 10);
    expect(convertCooking(1, 'cup', 'ml')).toBeCloseTo(240, 10);
    expect(convertCooking(3, 'tsp', 'tbsp')).toBeCloseTo(1, 4);
    expect(convertCooking(1, 'fl oz', 'ml')).toBeCloseTo(29.5735295625, 4);
  });

  it('defaults to water when no ingredient is given', () => {
    // The old behaviour for every ingredient, now the explicit default.
    expect(convertCooking(1, 'cup', 'g')).toBeCloseTo(240, 9);
    expect(convertCookingWithDensity(1, 'cup', 'g')).toBeCloseTo(240, 9);
  });
});

describe('findIngredientByText', () => {
  it('matches a plain name', () => {
    expect(findIngredientByText('2 cups flour')?.id).toBe('flour');
  });

  it('prefers the longest alias so brown sugar is not just sugar', () => {
    expect(findIngredientByText('1 cup brown sugar')?.id).toBe('brown-sugar');
    expect(findIngredientByText('1 cup icing sugar')?.id).toBe('icing-sugar');
    expect(findIngredientByText('1 cup sugar')?.id).toBe('sugar');
  });

  it('matches multi-word aliases', () => {
    expect(findIngredientByText('200g all-purpose flour')?.id).toBe('flour');
    expect(findIngredientByText('1 tbsp olive oil')?.id).toBe('oil');
  });

  it('is case insensitive', () => {
    expect(findIngredientByText('1 cup BUTTER')?.id).toBe('butter');
  });

  it('returns undefined for something it does not know', () => {
    expect(findIngredientByText('2 large eggs')).toBeUndefined();
  });
});

describe('getIngredient', () => {
  it('returns undefined for null, undefined and unknown ids', () => {
    expect(getIngredient(null)).toBeUndefined();
    expect(getIngredient(undefined)).toBeUndefined();
    expect(getIngredient('unobtainium')).toBeUndefined();
  });
});
