import { ConversionType } from '@/types/conversions';

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

// Volume conversion functions
export const volumeConversions: { [key: string]: number } = {
  // Base unit: litres
  'ml': 0.001,                 // millilitre
  'cl': 0.01,                  // centilitre
  'l': 1,                      // litre
  'm3': 1000,                  // cubic metre
  'cm3': 0.001,                // cubic centimetre
  'in3': 0.016387064,          // cubic inch (2.54^3, exact)
  'ft3': 28.316846592,         // cubic foot (1728 in^3, exact)
  'tsp': 0.00492892159375,     // teaspoon (US, exact)
  'tbsp': 0.01478676478125,    // tablespoon (US, exact)
  'flozUS': 0.0295735295625,   // fluid ounce (US, exact)
  'flozUK': 0.0284130625,      // fluid ounce (UK, exact)
  'cup': 0.2365882365,         // cup (US customary, 8 fl oz, exact)
  'ptUS': 0.473176473,         // pint (US, exact)
  'ptUK': 0.56826125,          // pint (UK, exact)
  'qtUS': 0.946352946,         // quart (US, exact)
  'galUS': 3.785411784,        // gallon (US, exact)
  'galUK': 4.54609,            // gallon (UK, exact)
};

export const volumeUnits = [
  { label: 'Millilitre (ml)', value: 'ml' },
  { label: 'Centilitre (cl)', value: 'cl' },
  { label: 'Litre (l)', value: 'l' },
  { label: 'Cubic Metre (m³)', value: 'm3' },
  { label: 'Cubic Centimetre (cm³)', value: 'cm3' },
  { label: 'Cubic Inch (in³)', value: 'in3' },
  { label: 'Cubic Foot (ft³)', value: 'ft3' },
  { label: 'Teaspoon (US)', value: 'tsp' },
  { label: 'Tablespoon (US)', value: 'tbsp' },
  { label: 'Fluid Ounce (US)', value: 'flozUS' },
  { label: 'Fluid Ounce (UK)', value: 'flozUK' },
  { label: 'Cup (US)', value: 'cup' },
  { label: 'Pint (US)', value: 'ptUS' },
  { label: 'Pint (UK)', value: 'ptUK' },
  { label: 'Quart (US)', value: 'qtUS' },
  { label: 'Gallon (US)', value: 'galUS' },
  { label: 'Gallon (UK)', value: 'galUK' },
];

export function convertVolume(value: number, fromUnit: string, toUnit: string): number {
  // Convert to litres first, then to target unit
  const litres = value * volumeConversions[fromUnit];
  return litres / volumeConversions[toUnit];
}

// Data storage conversion functions
export const dataStorageConversions: { [key: string]: number } = {
  // Base unit: bytes. Decimal (kB) and binary (KiB) prefixes both included --
  // they differ by 2.4% at kB and over 9% by TB, which is the whole point.
  'bit': 0.125,                // bit
  'B': 1,                      // byte
  'kB': 1e3,                   // kilobyte (decimal)
  'MB': 1e6,                   // megabyte (decimal)
  'GB': 1e9,                   // gigabyte (decimal)
  'TB': 1e12,                  // terabyte (decimal)
  'PB': 1e15,                  // petabyte (decimal)
  'KiB': 1024,                 // kibibyte (binary)
  'MiB': 1048576,              // mebibyte (binary)
  'GiB': 1073741824,           // gibibyte (binary)
  'TiB': 1099511627776,        // tebibyte (binary)
};

export const dataStorageUnits = [
  { label: 'Bit (b)', value: 'bit' },
  { label: 'Byte (B)', value: 'B' },
  { label: 'Kilobyte (kB, 1000 B)', value: 'kB' },
  { label: 'Megabyte (MB, 1000 kB)', value: 'MB' },
  { label: 'Gigabyte (GB, 1000 MB)', value: 'GB' },
  { label: 'Terabyte (TB, 1000 GB)', value: 'TB' },
  { label: 'Petabyte (PB, 1000 TB)', value: 'PB' },
  { label: 'Kibibyte (KiB, 1024 B)', value: 'KiB' },
  { label: 'Mebibyte (MiB, 1024 KiB)', value: 'MiB' },
  { label: 'Gibibyte (GiB, 1024 MiB)', value: 'GiB' },
  { label: 'Tebibyte (TiB, 1024 GiB)', value: 'TiB' },
];

export function convertDataStorage(value: number, fromUnit: string, toUnit: string): number {
  // Convert to bytes first, then to target unit
  const bytes = value * dataStorageConversions[fromUnit];
  return bytes / dataStorageConversions[toUnit];
}

// Time conversion functions
export const timeConversions: { [key: string]: number } = {
  // Base unit: seconds
  'ms': 0.001,                 // millisecond
  's': 1,                      // second
  'min': 60,                   // minute
  'h': 3600,                   // hour
  'day': 86400,                // day
  'week': 604800,              // week
  'month': 2629746,            // month (average Gregorian, 365.2425/12 days)
  'year': 31556952,            // year (average Gregorian, 365.2425 days)
};

export const timeUnits = [
  { label: 'Millisecond (ms)', value: 'ms' },
  { label: 'Second (s)', value: 's' },
  { label: 'Minute (min)', value: 'min' },
  { label: 'Hour (h)', value: 'h' },
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month (average)', value: 'month' },
  { label: 'Year (average)', value: 'year' },
];

export function convertTime(value: number, fromUnit: string, toUnit: string): number {
  // Convert to seconds first, then to target unit
  const seconds = value * timeConversions[fromUnit];
  return seconds / timeConversions[toUnit];
}

// Pressure conversion functions
export const pressureConversions: { [key: string]: number } = {
  // Base unit: pascals
  'Pa': 1,                        // pascal
  'hPa': 100,                     // hectopascal
  'kPa': 1000,                    // kilopascal
  'MPa': 1e6,                     // megapascal
  'bar': 100000,                  // bar
  'mbar': 100,                    // millibar
  'atm': 101325,                  // standard atmosphere (exact)
  'psi': 6894.757293168361,       // pound per square inch
  'torr': 101325 / 760,           // torr (1/760 atm, exact)
  'mmHg': 133.322387415,          // millimetre of mercury (conventional)
  'inHg': 3386.388640341,         // inch of mercury (conventional)
};

export const pressureUnits = [
  { label: 'Pascal (Pa)', value: 'Pa' },
  { label: 'Hectopascal (hPa)', value: 'hPa' },
  { label: 'Kilopascal (kPa)', value: 'kPa' },
  { label: 'Megapascal (MPa)', value: 'MPa' },
  { label: 'Bar', value: 'bar' },
  { label: 'Millibar (mbar)', value: 'mbar' },
  { label: 'Atmosphere (atm)', value: 'atm' },
  { label: 'Pound per Square Inch (psi)', value: 'psi' },
  { label: 'Torr', value: 'torr' },
  { label: 'Millimetre of Mercury (mmHg)', value: 'mmHg' },
  { label: 'Inch of Mercury (inHg)', value: 'inHg' },
];

export function convertPressure(value: number, fromUnit: string, toUnit: string): number {
  // Convert to pascals first, then to target unit
  const pascals = value * pressureConversions[fromUnit];
  return pascals / pressureConversions[toUnit];
}

// Energy conversion functions
export const energyConversions: { [key: string]: number } = {
  // Base unit: joules
  'J': 1,                          // joule
  'kJ': 1000,                      // kilojoule
  'MJ': 1e6,                       // megajoule
  'cal': 4.184,                    // calorie (thermochemical, exact)
  'kcal': 4184,                    // kilocalorie / food calorie (exact)
  'Wh': 3600,                      // watt hour (exact)
  'kWh': 3600000,                  // kilowatt hour (exact)
  'BTU': 1055.05585262,            // British thermal unit (IT)
  'ft-lb': 1.3558179483314004,     // foot-pound
  'eV': 1.602176634e-19,           // electronvolt (exact, SI 2019)
};

export const energyUnits = [
  { label: 'Joule (J)', value: 'J' },
  { label: 'Kilojoule (kJ)', value: 'kJ' },
  { label: 'Megajoule (MJ)', value: 'MJ' },
  { label: 'Calorie (cal)', value: 'cal' },
  { label: 'Kilocalorie (kcal)', value: 'kcal' },
  { label: 'Watt Hour (Wh)', value: 'Wh' },
  { label: 'Kilowatt Hour (kWh)', value: 'kWh' },
  { label: 'British Thermal Unit (BTU)', value: 'BTU' },
  { label: 'Foot-pound (ft-lb)', value: 'ft-lb' },
  { label: 'Electronvolt (eV)', value: 'eV' },
];

export function convertEnergy(value: number, fromUnit: string, toUnit: string): number {
  // Convert to joules first, then to target unit
  const joules = value * energyConversions[fromUnit];
  return joules / energyConversions[toUnit];
}

// Angle conversion functions
export const angleConversions: { [key: string]: number } = {
  // Base unit: radians
  'rad': 1,                        // radian
  'mrad': 0.001,                   // milliradian
  'deg': Math.PI / 180,            // degree
  'grad': Math.PI / 200,           // gradian
  'arcmin': Math.PI / 10800,       // arcminute (1/60 degree)
  'arcsec': Math.PI / 648000,      // arcsecond (1/3600 degree)
  'turn': 2 * Math.PI,             // full turn / revolution
};

export const angleUnits = [
  { label: 'Radian (rad)', value: 'rad' },
  { label: 'Milliradian (mrad)', value: 'mrad' },
  { label: 'Degree (°)', value: 'deg' },
  { label: 'Gradian (gon)', value: 'grad' },
  { label: 'Arcminute (′)', value: 'arcmin' },
  { label: 'Arcsecond (″)', value: 'arcsec' },
  { label: 'Turn (revolution)', value: 'turn' },
];

export function convertAngle(value: number, fromUnit: string, toUnit: string): number {
  // Convert to radians first, then to target unit
  const radians = value * angleConversions[fromUnit];
  return radians / angleConversions[toUnit];
}

// Single dispatch point for every conversion family. Both the Calculator
// component and the useConverter hook route through this, so a new converter
// only has to be registered once.
export function convertByType(
  conversionType: ConversionType,
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  switch (conversionType) {
    case 'length':
      return convertLength(value, fromUnit, toUnit);
    case 'weight':
    case 'fitnessWeight':
      return convertWeight(value, fromUnit, toUnit);
    case 'temperature':
      return convertTemperature(value, fromUnit, toUnit);
    case 'area':
      return convertArea(value, fromUnit, toUnit);
    case 'speed':
      return convertSpeed(value, fromUnit, toUnit);
    case 'height':
      return convertHeight(value, fromUnit, toUnit);
    case 'cooking':
      return convertCooking(value, fromUnit, toUnit);
    case 'fuelEconomy':
      return convertFuelEconomy(value, fromUnit, toUnit);
    case 'power':
      return convertPower(value, fromUnit, toUnit);
    case 'volume':
      return convertVolume(value, fromUnit, toUnit);
    case 'dataStorage':
      return convertDataStorage(value, fromUnit, toUnit);
    case 'time':
      return convertTime(value, fromUnit, toUnit);
    case 'pressure':
      return convertPressure(value, fromUnit, toUnit);
    case 'energy':
      return convertEnergy(value, fromUnit, toUnit);
    case 'angle':
      return convertAngle(value, fromUnit, toUnit);
    case 'bmi': {
      // BMI is not a unit conversion: value is weight in kg and toUnit
      // carries height in cm as a string.
      const heightM = Number(toUnit) / 100;
      return heightM > 0 ? value / (heightM * heightM) : 0;
    }
    default:
      return 0;
  }
}
