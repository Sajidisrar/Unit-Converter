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
  | 'power';

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

// JSON handling types
export interface JsonNode {
  key?: string;
  value: JsonValue;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  expanded: boolean;
  level: number;
}

export type JsonValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JsonValue[] 
  | { [key: string]: JsonValue };

// Tool configuration types
export interface ToolConfig {
  name: string;
  url: string;
  icon: string;
  category: 'developer' | 'converter';
  description: string;
}

export interface DeveloperTool {
  name: string;
  url: string;
  icon: string;
  description: string;
  category: string;
}
