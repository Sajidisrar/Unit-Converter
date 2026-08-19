import { convertCooking } from './conversions';

export type IngredientCategory =
  | 'flour'
  | 'sugar'
  | 'fat'
  | 'liquid'
  | 'grain'
  | 'other';

export interface Ingredient {
  id: string;
  label: string;
  /** Grams per millilitre. */
  density: number;
  /** Lower-case terms the recipe parser matches against free text. */
  aliases: string[];
  category: IngredientCategory;
}

// Density is stored as g/ml rather than g/cup so it composes with the
// millilitre-based cookingConversions and works for any volume unit.
//
// Figures are the widely published per-cup weights divided by the 240 ml cup
// this site uses: flour 120 g, granulated sugar 200 g, butter 227 g, and so on.
// They are reference values, not guarantees -- how an ingredient is packed
// changes the result, and scooped flour can run 20% heavier than spooned.
export const ingredients: Ingredient[] = [
  // Liquids
  { id: 'water', label: 'Water', density: 1, aliases: ['water'], category: 'liquid' },
  { id: 'milk', label: 'Milk', density: 1.03, aliases: ['milk', 'whole milk', 'semi-skimmed milk'], category: 'liquid' },
  { id: 'oil', label: 'Vegetable oil', density: 0.908, aliases: ['oil', 'vegetable oil', 'sunflower oil', 'olive oil'], category: 'liquid' },
  { id: 'honey', label: 'Honey', density: 1.417, aliases: ['honey'], category: 'liquid' },
  { id: 'maple-syrup', label: 'Maple syrup', density: 1.32, aliases: ['maple syrup', 'syrup'], category: 'liquid' },

  // Flours and powders
  { id: 'flour', label: 'Plain flour', density: 0.5, aliases: ['flour', 'plain flour', 'all purpose flour', 'all-purpose flour', 'ap flour'], category: 'flour' },
  { id: 'bread-flour', label: 'Bread flour', density: 0.529, aliases: ['bread flour', 'strong flour', 'strong white flour'], category: 'flour' },
  { id: 'cake-flour', label: 'Cake flour', density: 0.475, aliases: ['cake flour', 'sponge flour'], category: 'flour' },
  { id: 'cornflour', label: 'Cornflour / cornstarch', density: 0.5, aliases: ['cornflour', 'cornstarch', 'corn starch'], category: 'flour' },
  { id: 'cocoa', label: 'Cocoa powder', density: 0.417, aliases: ['cocoa', 'cocoa powder', 'cacao'], category: 'other' },

  // Sugars
  { id: 'sugar', label: 'Granulated sugar', density: 0.833, aliases: ['sugar', 'granulated sugar', 'caster sugar', 'white sugar'], category: 'sugar' },
  { id: 'brown-sugar', label: 'Brown sugar (packed)', density: 0.917, aliases: ['brown sugar', 'light brown sugar', 'dark brown sugar', 'muscovado'], category: 'sugar' },
  { id: 'icing-sugar', label: 'Icing sugar', density: 0.5, aliases: ['icing sugar', 'powdered sugar', 'confectioners sugar'], category: 'sugar' },

  // Fats
  { id: 'butter', label: 'Butter', density: 0.946, aliases: ['butter', 'unsalted butter', 'salted butter'], category: 'fat' },

  // Grains and other solids
  { id: 'oats', label: 'Rolled oats', density: 0.375, aliases: ['oats', 'rolled oats', 'porridge oats'], category: 'grain' },
  { id: 'rice', label: 'Rice (uncooked)', density: 0.771, aliases: ['rice', 'white rice', 'basmati', 'long grain rice'], category: 'grain' },
  { id: 'salt', label: 'Table salt', density: 1.2, aliases: ['salt', 'table salt', 'fine salt'], category: 'other' },
];

const byId = new Map(ingredients.map((entry) => [entry.id, entry]));

export function getIngredient(id: string | null | undefined): Ingredient | undefined {
  return id ? byId.get(id) : undefined;
}

/**
 * Match free recipe text to an ingredient. Longest alias wins, so
 * "brown sugar" is not captured by the "sugar" entry.
 */
export function findIngredientByText(text: string): Ingredient | undefined {
  const haystack = text.toLowerCase();
  let best: { ingredient: Ingredient; length: number } | undefined;

  for (const ingredient of ingredients) {
    for (const alias of ingredient.aliases) {
      if (haystack.includes(alias) && (!best || alias.length > best.length)) {
        best = { ingredient, length: alias.length };
      }
    }
  }

  return best?.ingredient;
}

/**
 * Cooking conversion that accounts for what is being measured.
 *
 * Thin wrapper over convertCooking: looks up the ingredient's density and
 * passes it through. Volume-to-volume and mass-to-mass ignore the ingredient
 * entirely. Falls back to water when none is chosen, which is what the
 * converter assumed for everything before densities existed.
 */
export function convertCookingWithDensity(
  value: number,
  fromUnit: string,
  toUnit: string,
  ingredientId?: string | null
): number {
  return convertCooking(value, fromUnit, toUnit, getIngredient(ingredientId)?.density ?? 1);
}
