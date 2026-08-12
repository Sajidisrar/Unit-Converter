import { ToolConfig } from '@/types/conversions';

export const allTools: ToolConfig[] = [
  // Unit Converters
  { name: "Unit Converter", url: "/unit-converter", icon: "📏", category: "converter", description: "Convert length, weight, temperature, area, and speed" },
  { name: "Power Converter", url: "/power", icon: "⚡", category: "converter", description: "Convert power units (watts, horsepower, BTU/h)" },
  { name: "Electricity Consumption", url: "/electricity-consumption", icon: "🔌", category: "converter", description: "Calculate home electricity consumption and costs" },
  { name: "Cooking Converter", url: "/cooking", icon: "👨‍🍳", category: "converter", description: "Convert cooking units (cups, tbsp, grams, ml)" },
  { name: "Fitness Converter", url: "/fitness", icon: "💪", category: "converter", description: "Convert height, weight, and calculate BMI" },
  { name: "Fuel Economy", url: "/fuel-economy", icon: "⛽", category: "converter", description: "Convert MPG, L/100km, and km/L" },
];

export const converterTools = allTools.filter(tool => tool.category === 'converter');
