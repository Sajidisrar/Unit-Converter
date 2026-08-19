import { ToolCategory, ToolConfig } from '@/types/conversions';

// Single source of truth for the tool set. The navbar, footer, homepage grid,
// breadcrumbs and related-tool blocks all derive from this array -- nothing
// should hardcode a tool list of its own.
export const allTools: ToolConfig[] = [
  // Measurement
  {
    name: "Unit Converter",
    url: "/unit-converter",
    icon: "📏",
    category: "measurement",
    description: "Convert length, weight, temperature, area and speed",
    keywords: ["metres to feet", "kg to lbs", "celsius to fahrenheit", "metric converter"],
    relatedPosts: ["unit-conversion-software"],
    featured: true,
  },
  {
    name: "Volume Converter",
    url: "/volume",
    icon: "🧪",
    category: "measurement",
    description: "Convert litres, gallons, pints, cubic metres and fluid ounces",
    keywords: ["litres to gallons", "ml to oz", "cubic metres to litres", "US vs UK gallon"],
  },
  {
    name: "Time Converter",
    url: "/time",
    icon: "⏱️",
    category: "measurement",
    description: "Convert seconds, minutes, hours, days, weeks and years",
    keywords: ["hours to minutes", "days to hours", "seconds to milliseconds"],
  },
  {
    name: "Pressure Converter",
    url: "/pressure",
    icon: "🎈",
    category: "measurement",
    description: "Convert bar, psi, pascal, atmospheres and mmHg",
    keywords: ["psi to bar", "bar to psi", "tyre pressure", "kPa to psi"],
  },
  {
    name: "Bulk Converter",
    url: "/bulk-converter",
    icon: "📋",
    category: "measurement",
    description: "Convert a whole column of values at once, with CSV export",
    keywords: ["bulk unit converter", "convert a list of values", "batch conversion", "csv unit converter"],
  },
  {
    name: "Angle Converter",
    url: "/angle",
    icon: "📐",
    category: "measurement",
    description: "Convert degrees, radians, gradians, arcminutes and turns",
    keywords: ["degrees to radians", "radians to degrees", "gradians"],
  },

  // Energy and power
  {
    name: "Power Converter",
    url: "/power",
    icon: "⚡",
    category: "energy",
    description: "Convert watts, kilowatts, horsepower and BTU per hour",
    keywords: ["watts to horsepower", "kW to hp", "BTU to watts"],
    relatedPosts: ["power-wattage-consumption"],
    featured: true,
  },
  {
    name: "Energy Converter",
    url: "/energy",
    icon: "🔋",
    category: "energy",
    description: "Convert joules, kilowatt hours, calories and BTU",
    keywords: ["kWh to joules", "calories to kJ", "BTU to kWh"],
    relatedPosts: ["power-wattage-consumption"],
  },
  {
    name: "Electricity Consumption",
    url: "/electricity-consumption",
    icon: "🔌",
    category: "energy",
    description: "Calculate home electricity consumption and running costs",
    keywords: ["electricity cost calculator", "kWh cost", "appliance running cost"],
    relatedPosts: ["power-wattage-consumption"],
    featured: true,
  },

  // Health
  {
    name: "Fitness Converter",
    url: "/fitness",
    icon: "💪",
    category: "health",
    description: "Convert height and weight, and calculate BMI",
    keywords: ["bmi calculator", "stone to kg", "feet and inches to cm"],
  },

  // Motoring
  {
    name: "Fuel Economy",
    url: "/fuel-economy",
    icon: "⛽",
    category: "motoring",
    description: "Convert MPG, L/100km and km/L",
    keywords: ["mpg to l/100km", "km/L to mpg", "UK vs US mpg"],
  },

  // Kitchen
  {
    name: "Recipe Scaler",
    url: "/recipe-scaler",
    icon: "🥣",
    category: "kitchen",
    description: "Halve or double a recipe and convert cups to grams",
    keywords: ["scale a recipe", "halve a recipe", "double a recipe", "recipe converter", "cups to grams"],
    featured: true,
  },
  {
    name: "Cooking Converter",
    url: "/cooking",
    icon: "👨‍🍳",
    category: "kitchen",
    description: "Convert cups, tablespoons, grams and millilitres",
    keywords: ["cups to grams", "tbsp to ml", "cooking conversion chart"],
    featured: true,
  },

  // Data
  {
    name: "Data Storage",
    url: "/data-storage",
    icon: "💾",
    category: "data",
    description: "Convert bytes, kilobytes, megabytes, gigabytes and terabytes",
    keywords: ["GB to MB", "TB to GB", "GiB vs GB", "bytes to bits"],
  },
];

// Display order and labels for grouped navigation.
export const toolCategories: { id: ToolCategory; label: string }[] = [
  { id: 'measurement', label: 'Measurement' },
  { id: 'energy', label: 'Energy & Power' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'health', label: 'Health' },
  { id: 'motoring', label: 'Motoring' },
  { id: 'data', label: 'Data' },
];

export const toolsByCategory = toolCategories.map((category) => ({
  ...category,
  tools: allTools.filter((tool) => tool.category === category.id),
}));

export const featuredTools = allTools.filter((tool) => tool.featured);

export function getToolByUrl(url: string): ToolConfig | undefined {
  return allTools.find((tool) => tool.url === url);
}

export function getCategoryLabel(category: ToolCategory): string {
  return toolCategories.find((entry) => entry.id === category)?.label ?? 'Tools';
}

/** Other tools in the same category, for cross-linking. */
export function getRelatedTools(url: string, limit = 3): ToolConfig[] {
  const tool = getToolByUrl(url);

  if (!tool) {
    return [];
  }

  const sameCategory = allTools.filter(
    (candidate) => candidate.category === tool.category && candidate.url !== url
  );
  const others = allTools.filter(
    (candidate) => candidate.category !== tool.category && candidate.url !== url
  );

  return [...sameCategory, ...others].slice(0, limit);
}

// Retained for existing imports; every tool is a converter now.
export const converterTools = allTools;

/**
 * Hand-written pages for high-intent conversion pairs. Kept separate from
 * allTools because they are landing pages rather than tools, but they still
 * need internal links -- a page reachable only from the sitemap is orphaned.
 */
export interface ConversionPair {
  name: string;
  url: string;
  /** Tool the pair belongs to, for grouping and cross-links. */
  toolUrl: string;
}

export const popularConversions: ConversionPair[] = [
  { name: "Metres to Feet", url: "/meters-to-feet", toolUrl: "/unit-converter" },
  { name: "Kg to Lbs", url: "/kg-to-lbs", toolUrl: "/unit-converter" },
  { name: "Celsius to Fahrenheit", url: "/celsius-to-fahrenheit", toolUrl: "/unit-converter" },
  { name: "Inches to CM", url: "/inches-to-cm", toolUrl: "/unit-converter" },
  { name: "Miles to KM", url: "/miles-to-km", toolUrl: "/unit-converter" },
  { name: "Grams to Ounces", url: "/grams-to-ounces", toolUrl: "/unit-converter" },
  { name: "MPH to KM/H", url: "/mph-to-kmh", toolUrl: "/unit-converter" },
  { name: "Litres to Gallons", url: "/litres-to-gallons", toolUrl: "/volume" },
  { name: "Watts to Horsepower", url: "/watts-to-horsepower", toolUrl: "/power" },
  { name: "Cups to Grams", url: "/cups-to-grams", toolUrl: "/cooking" },
];

/** Conversion pages belonging to a given tool, for on-page cross-linking. */
export function getConversionsForTool(toolUrl: string): ConversionPair[] {
  return popularConversions.filter((pair) => pair.toolUrl === toolUrl);
}
