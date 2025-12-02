import { ToolConfig } from '@/types/conversions';

export const allTools: ToolConfig[] = [
  // Developer Tools
  { name: "AI Tools", url: "/ai-tools", icon: "🤖", category: "developer", description: "AI cheat sheet and prompt engineering" },
  { name: "JSON Tools", url: "/json", icon: "📋", category: "developer", description: "Format, parse, compare, and convert JSON" },
  { name: "XML Tools", url: "/xml", icon: "📄", category: "developer", description: "Format, parse, and compare XML documents" },
  { name: "YAML Tools", url: "/yaml", icon: "📝", category: "developer", description: "Format, validate, and convert YAML" },
  { name: "CSV Tools", url: "/csv", icon: "📊", category: "developer", description: "Format, convert, and view CSV data" },
  { name: "Hash Generator", url: "/hash-generator", icon: "🔒", category: "developer", description: "Generate MD5, SHA-256, SHA-512 hashes" },
  { name: "Encoding Tools", url: "/encoding", icon: "🔐", category: "developer", description: "Base64, URL encoding, and JWT decoding" },
  { name: "Text Tools", url: "/text", icon: "📝", category: "developer", description: "Compare text and test regex patterns" },
  { name: "Color Converter", url: "/color-converter", icon: "🎨", category: "developer", description: "Convert color formats" },
  
  // Unit Converters
  { name: "Unit Converter", url: "/unit-converter", icon: "📏", category: "converter", description: "Convert length, weight, temperature, area, and speed" },
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
