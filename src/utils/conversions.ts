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
  'oz': 0.028349523125,  // ounce (1/16 lb, exact)
  'lb': 0.45359237,      // pound (exact, international avoirdupois)
  'st': 6.35029318,      // stone (14 lb, exact)
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
  'ft2': 0.09290304,     // square foot (0.3048^2, exact)
  'yd2': 0.83612736,     // square yard (0.9144^2, exact)
  'ac': 4046.8564224,    // acre (exact)
  'ha': 10000,           // hectare
  'mi2': 2589988.110336, // square mile (1609.344^2, exact)
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
  'km/h': 1 / 3.6,      // kilometers per hour (exact)
  'mph': 0.44704,       // miles per hour
  'ft/s': 0.3048,       // feet per second
  'knot': 1852 / 3600,  // knot (1 nmi/h, exact)
  'mach': 343,          // mach (speed of sound in air at 20 C, approximate)
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

// Cooking conversion functions
export const cookingConversions: { [key: string]: number } = {
  // Base unit: milliliters
  'ml': 1,               // milliliter
  'l': 1000,             // liter
  'tsp': 4.92892159375,  // teaspoon (US, exact)
  'tbsp': 14.78676478125, // tablespoon (US, exact)
  'cup': 240,            // cup
  'fl oz': 29.5735295625, // fluid ounce (US, exact)
  'g': 1,                // gram (assuming water equivalence)
};

export const cookingUnits = [
  { label: 'Milliliter (ml)', value: 'ml' },
  { label: 'Liter (l)', value: 'l' },
  { label: 'Teaspoon (tsp)', value: 'tsp' },
  { label: 'Tablespoon (tbsp)', value: 'tbsp' },
  { label: 'Cup (cup)', value: 'cup' },
  { label: 'Fluid Ounce (fl oz)', value: 'fl oz' },
  { label: 'Gram (g) – water equivalence', value: 'g' },
];

export function convertCooking(value: number, fromUnit: string, toUnit: string): number {
  // Convert to milliliters first, then to target unit
  const milliliters = value * cookingConversions[fromUnit];
  return milliliters / cookingConversions[toUnit];
}

// Fitness Height conversion functions
export const heightConversions: { [key: string]: number } = {
  // Base unit: centimeters
  'cm': 1,               // centimeter
  'm': 100,              // meter
  'in': 2.54,            // inch
  'ft': 30.48,           // foot
};

export const heightUnits = [
  { label: 'Centimeter (cm)', value: 'cm' },
  { label: 'Meter (m)', value: 'm' },
  { label: 'Inch (in)', value: 'in' },
  { label: 'Foot (ft)', value: 'ft' },
];

export function convertHeight(value: number, fromUnit: string, toUnit: string): number {
  // Convert to centimeters first, then to target unit
  const centimeters = value * heightConversions[fromUnit];
  return centimeters / heightConversions[toUnit];
}

// Fitness Weight units (alias to weightUnits)
export const fitnessWeightUnits = weightUnits;

// BMI calculation functions
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal weight';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obesity';
  }
}

// Fuel Economy conversion functions
export const fuelEconomyUnits = [
  { label: 'Liters per 100 Kilometers (L/100km)', value: 'L/100km' },
  { label: 'Kilometers per Liter (km/L)', value: 'km/L' },
  { label: 'Miles per Gallon (US) (mpgUS)', value: 'mpgUS' },
  { label: 'Miles per Gallon (UK) (mpgUK)', value: 'mpgUK' },
];

export function convertFuelEconomy(value: number, fromUnit: string, toUnit: string): number {
  let lPer100km: number;

  // Convert from source unit to L/100km
  switch (fromUnit) {
    case 'L/100km':
      lPer100km = value;
      break;
    case 'km/L':
      lPer100km = 100 / value;
      break;
    case 'mpgUS':
      lPer100km = 235.215 / value;
      break;
    case 'mpgUK':
      lPer100km = 282.481 / value;
      break;
    default:
      lPer100km = value;
  }

  // Convert from L/100km to target unit
  switch (toUnit) {
    case 'L/100km':
      return lPer100km;
    case 'km/L':
      return 100 / lPer100km;
    case 'mpgUS':
      return 235.215 / lPer100km;
    case 'mpgUK':
      return 282.481 / lPer100km;
    default:
      return lPer100km;
  }
}

// Power conversion functions
export const powerConversions: { [key: string]: number } = {
  // Base unit: watts
  'W': 1,                    // watt
  'kW': 1000,                // kilowatt
  'MW': 1000000,             // megawatt
  'GW': 1000000000,          // gigawatt
  'hp': 745.6998715822702,   // horsepower (mechanical, exact)
  'hp_metric': 735.49875,    // horsepower (metric, exact)
  'BTU/h': 0.29307107017,    // BTU per hour (IT)
  'ft-lb/s': 1.35582,        // foot-pound per second
  'cal/s': 4.184,            // calorie per second (thermochemical, exact)
  'erg/s': 0.0000001,        // erg per second
};

export const powerUnits = [
  { label: 'Watt (W)', value: 'W' },
  { label: 'Kilowatt (kW)', value: 'kW' },
  { label: 'Megawatt (MW)', value: 'MW' },
  { label: 'Gigawatt (GW)', value: 'GW' },
  { label: 'Horsepower (hp)', value: 'hp' },
  { label: 'Horsepower (Metric) (hp)', value: 'hp_metric' },
  { label: 'BTU per Hour (BTU/h)', value: 'BTU/h' },
  { label: 'Foot-pound per Second (ft-lb/s)', value: 'ft-lb/s' },
  { label: 'Calorie per Second (cal/s)', value: 'cal/s' },
  { label: 'Erg per Second (erg/s)', value: 'erg/s' },
];

export function convertPower(value: number, fromUnit: string, toUnit: string): number {
  // Convert to watts first, then to target unit
  const watts = value * powerConversions[fromUnit];
  return watts / powerConversions[toUnit];
}
