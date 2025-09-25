// Length conversion functions
export const lengthConversions: { [key: string]: number } = {
  // Base unit: meters
  'mm': 0.001,           // millimeter
  'cm': 0.01,            // centimeter
  'm': 1,                // meter
  'km': 1000,            // kilometer
  'in': 0.0254,          // inch
  'ft': 0.3048,          // foot
  'yd': 0.9144,          // yard
  'mi': 1609.344,        // mile
  'nmi': 1852,           // nautical mile
};

export const lengthUnits = [
  { label: 'Millimeter (mm)', value: 'mm' },
  { label: 'Centimeter (cm)', value: 'cm' },
  { label: 'Meter (m)', value: 'm' },
  { label: 'Kilometer (km)', value: 'km' },
  { label: 'Inch (in)', value: 'in' },
  { label: 'Foot (ft)', value: 'ft' },
  { label: 'Yard (yd)', value: 'yd' },
  { label: 'Mile (mi)', value: 'mi' },
  { label: 'Nautical Mile (nmi)', value: 'nmi' },
];

export function convertLength(value: number, fromUnit: string, toUnit: string): number {
  // Convert to meters first, then to target unit
  const meters = value * lengthConversions[fromUnit];
  return meters / lengthConversions[toUnit];
}

// Weight conversion functions
export const weightConversions: { [key: string]: number } = {
  // Base unit: kilograms
  'mg': 0.000001,        // milligram
  'g': 0.001,            // gram
  'kg': 1,               // kilogram
  'oz': 0.0283495,       // ounce
  'lb': 0.453592,        // pound
  'st': 6.35029,         // stone
  't': 1000,             // metric ton
};

export const weightUnits = [
  { label: 'Milligram (mg)', value: 'mg' },
  { label: 'Gram (g)', value: 'g' },
  { label: 'Kilogram (kg)', value: 'kg' },
  { label: 'Ounce (oz)', value: 'oz' },
  { label: 'Pound (lb)', value: 'lb' },
  { label: 'Stone (st)', value: 'st' },
  { label: 'Metric Ton (t)', value: 't' },
];

export function convertWeight(value: number, fromUnit: string, toUnit: string): number {
  // Convert to kilograms first, then to target unit
  const kilograms = value * weightConversions[fromUnit];
  return kilograms / weightConversions[toUnit];
}

// Temperature conversion functions
export const temperatureUnits = [
  { label: 'Celsius (°C)', value: 'c' },
  { label: 'Fahrenheit (°F)', value: 'f' },
  { label: 'Kelvin (K)', value: 'k' },
];

export function convertTemperature(value: number, fromUnit: string, toUnit: string): number {
  let celsius: number;
  
  // Convert to Celsius first
  switch (fromUnit) {
    case 'c':
      celsius = value;
      break;
    case 'f':
      celsius = (value - 32) * 5 / 9;
      break;
    case 'k':
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }
  
  // Convert from Celsius to target unit
  switch (toUnit) {
    case 'c':
      return celsius;
    case 'f':
      return (celsius * 9 / 5) + 32;
    case 'k':
      return celsius + 273.15;
    default:
      return celsius;
  }
}

// Area conversion functions
export const areaConversions: { [key: string]: number } = {
  // Base unit: square meters
  'mm2': 0.000001,       // square millimeter
  'cm2': 0.0001,         // square centimeter
  'm2': 1,               // square meter
  'km2': 1000000,        // square kilometer
  'in2': 0.00064516,     // square inch
  'ft2': 0.092903,       // square foot
  'yd2': 0.836127,       // square yard
  'ac': 4046.86,         // acre
  'ha': 10000,           // hectare
  'mi2': 2589988.11,     // square mile
};

export const areaUnits = [
  { label: 'Square Millimeter (mm²)', value: 'mm2' },
  { label: 'Square Centimeter (cm²)', value: 'cm2' },
  { label: 'Square Meter (m²)', value: 'm2' },
  { label: 'Square Kilometer (km²)', value: 'km2' },
  { label: 'Square Inch (in²)', value: 'in2' },
  { label: 'Square Foot (ft²)', value: 'ft2' },
  { label: 'Square Yard (yd²)', value: 'yd2' },
  { label: 'Acre (ac)', value: 'ac' },
  { label: 'Hectare (ha)', value: 'ha' },
  { label: 'Square Mile (mi²)', value: 'mi2' },
];

export function convertArea(value: number, fromUnit: string, toUnit: string): number {
  // Convert to square meters first, then to target unit
  const squareMeters = value * areaConversions[fromUnit];
  return squareMeters / areaConversions[toUnit];
}

// Speed conversion functions
export const speedConversions: { [key: string]: number } = {
  // Base unit: meters per second
  'm/s': 1,              // meters per second
  'km/h': 0.277778,     // kilometers per hour
  'mph': 0.44704,       // miles per hour
  'ft/s': 0.3048,       // feet per second
  'knot': 0.514444,     // knot
  'mach': 343,          // mach (speed of sound)
};

export const speedUnits = [
  { label: 'Meters per Second (m/s)', value: 'm/s' },
  { label: 'Kilometers per Hour (km/h)', value: 'km/h' },
  { label: 'Miles per Hour (mph)', value: 'mph' },
  { label: 'Feet per Second (ft/s)', value: 'ft/s' },
  { label: 'Knot (knot)', value: 'knot' },
  { label: 'Mach (mach)', value: 'mach' },
];

export function convertSpeed(value: number, fromUnit: string, toUnit: string): number {
  // Convert to meters per second first, then to target unit
  const metersPerSecond = value * speedConversions[fromUnit];
  return metersPerSecond / speedConversions[toUnit];
}
