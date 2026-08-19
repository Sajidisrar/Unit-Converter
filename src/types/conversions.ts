// Type definitions for conversion system
export interface ConversionUnit {
  label: string;
  value: string;
  factor?: number;
}

export interface ConversionConfig {
  baseUnit: string;
  units: ConversionUnit[];
  converter: (value: number, from: string, to: string) => number;
}

export type ConversionType = 
  | 'length' 
  | 'weight' 
  | 'temperature' 
  | 'area' 
  | 'speed' 
  | 'height' 
  | 'cooking' 
  | 'fuelEconomy' 
  | 'fitnessWeight' 
  | 'bmi' 
  | 'power'
  | 'volume'
  | 'dataStorage'
  | 'time'
  | 'pressure'
  | 'energy'
  | 'angle';

export interface ConversionResult {
  value: number;
  fromUnit: string;
  toUnit: string;
  result: number;
  isValid: boolean;
  error?: string;
}

export interface ConversionError {
  message: string;
  code: string;
  field?: string;
}

// Tool configuration types
export type ToolCategory =
  | 'measurement'
  | 'energy'
  | 'health'
  | 'motoring'
  | 'kitchen'
  | 'data';

export interface ToolConfig {
  name: string;
  url: string;
  icon: string;
  category: ToolCategory;
  description: string;
  /** Search terms this tool should answer for. Used in page metadata. */
  keywords: string[];
  /** blog-posts.json ids to cross-link from this tool's page. */
  relatedPosts?: string[];
  /** Surfaced above the fold on the homepage. */
  featured?: boolean;
}
