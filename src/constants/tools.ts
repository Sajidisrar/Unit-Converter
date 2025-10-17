import { ToolConfig } from '@/types/conversions';

export const allTools: ToolConfig[] = [
  // Developer Tools
  { name: "AI Cheat Sheet", url: "/ai-cheat-sheet", icon: "🤖", category: "developer", description: "Comprehensive AI development reference" },
  { name: "Regex Validator", url: "/regex-validator", icon: "🔍", category: "developer", description: "Test and validate regular expressions" },
  { name: "Prompt Engineering", url: "/prompt-engineering", icon: "💬", category: "developer", description: "Learn effective prompt engineering" },
  { name: "Base64 Encoder/Decoder", url: "/base64-encoder-decoder", icon: "🔐", category: "developer", description: "Encode and decode Base64 data" },
  { name: "JSON to CSV", url: "/json-to-csv", icon: "📊", category: "developer", description: "Convert JSON to CSV format" },
  { name: "URL Encoder/Decoder", url: "/url-encoder-decoder", icon: "🌐", category: "developer", description: "Encode and decode URLs" },
  { name: "JWT Decoder", url: "/jwt-decoder", icon: "🔑", category: "developer", description: "Decode JSON Web Tokens" },
  { name: "JSON Prettier", url: "/json-prettier", icon: "✨", category: "developer", description: "Format and beautify JSON" },
  { name: "JSON Parser", url: "/json-parser", icon: "🔧", category: "developer", description: "Parse and validate JSON" },
  { name: "XML Formatter", url: "/xml-formatter", icon: "📄", category: "developer", description: "Format XML documents" },
  { name: "JSON Compare", url: "/json-compare", icon: "🔍", category: "developer", description: "Compare JSON objects" },
  { name: "Text Compare", url: "/text-compare", icon: "📝", category: "developer", description: "Compare text documents" },
  { name: "Color Converter", url: "/color-converter", icon: "🎨", category: "developer", description: "Convert color formats" },
  
  // Unit Converters
  { name: "Length Converter", url: "/length", icon: "📏", category: "converter", description: "Convert length units (meters, feet, inches)" },
  { name: "Weight Converter", url: "/weight", icon: "⚖️", category: "converter", description: "Convert weight units (kg, lbs, oz)" },
  { name: "Temperature Converter", url: "/temperature", icon: "🌡️", category: "converter", description: "Convert temperature (Celsius, Fahrenheit)" },
  { name: "Area Converter", url: "/area", icon: "📐", category: "converter", description: "Convert area units (sq meters, acres)" },
  { name: "Speed Converter", url: "/speed", icon: "🏃", category: "converter", description: "Convert speed (MPH, KPH, knots)" },
  { name: "Power Converter", url: "/power", icon: "⚡", category: "converter", description: "Convert power units (watts, horsepower, BTU/h)" },
  { name: "Electricity Consumption", url: "/electricity-consumption", icon: "🔌", category: "converter", description: "Calculate home electricity consumption and costs" },
  { name: "Cooking Converter", url: "/cooking", icon: "👨‍🍳", category: "converter", description: "Convert cooking units (cups, tbsp)" }
];

export const developerTools = allTools.filter(tool => tool.category === 'developer');
export const converterTools = allTools.filter(tool => tool.category === 'converter');

export const toolCategories = [
  {
    name: 'Developer Tools',
    tools: developerTools,
    description: 'Essential tools for web developers, programmers, and IT professionals.',
    color: 'blue'
  },
  {
    name: 'Unit Converters',
    tools: converterTools,
    description: 'Convert between various units of measurement for everyday and professional use.',
    color: 'orange'
  }
];
