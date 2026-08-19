import { ConversionType } from '@/types/conversions';
import {
  angleUnits,
  areaUnits,
  cookingUnits,
  dataStorageUnits,
  energyUnits,
  lengthUnits,
  powerUnits,
  pressureUnits,
  speedUnits,
  temperatureUnits,
  timeUnits,
  volumeUnits,
  weightUnits,
} from '@/utils/conversions';

export interface ConversionCategory {
  id: string;
  label: string;
  conversionType: ConversionType;
  units: { label: string; value: string }[];
  defaultFrom: string;
  defaultTo: string;
  /** Full tool page for this family. */
  toolUrl: string;
}

// Ordered by search demand: length, weight and temperature are the bulk of it.
// Shared by the homepage hero converter and the bulk converter page so the two
// cannot drift apart.
export const CONVERSION_CATEGORIES: ConversionCategory[] = [
  { id: 'length', label: 'Length', conversionType: 'length', units: lengthUnits, defaultFrom: 'm', defaultTo: 'ft', toolUrl: '/unit-converter' },
  { id: 'weight', label: 'Weight', conversionType: 'weight', units: weightUnits, defaultFrom: 'kg', defaultTo: 'lb', toolUrl: '/unit-converter' },
  { id: 'temperature', label: 'Temperature', conversionType: 'temperature', units: temperatureUnits, defaultFrom: 'c', defaultTo: 'f', toolUrl: '/unit-converter' },
  { id: 'volume', label: 'Volume', conversionType: 'volume', units: volumeUnits, defaultFrom: 'l', defaultTo: 'galUS', toolUrl: '/volume' },
  { id: 'area', label: 'Area', conversionType: 'area', units: areaUnits, defaultFrom: 'm2', defaultTo: 'ft2', toolUrl: '/unit-converter' },
  { id: 'speed', label: 'Speed', conversionType: 'speed', units: speedUnits, defaultFrom: 'mph', defaultTo: 'km/h', toolUrl: '/unit-converter' },
  { id: 'power', label: 'Power', conversionType: 'power', units: powerUnits, defaultFrom: 'kW', defaultTo: 'hp', toolUrl: '/power' },
  { id: 'energy', label: 'Energy', conversionType: 'energy', units: energyUnits, defaultFrom: 'kWh', defaultTo: 'J', toolUrl: '/energy' },
  { id: 'pressure', label: 'Pressure', conversionType: 'pressure', units: pressureUnits, defaultFrom: 'bar', defaultTo: 'psi', toolUrl: '/pressure' },
  { id: 'time', label: 'Time', conversionType: 'time', units: timeUnits, defaultFrom: 'h', defaultTo: 'min', toolUrl: '/time' },
  { id: 'data', label: 'Data storage', conversionType: 'dataStorage', units: dataStorageUnits, defaultFrom: 'GB', defaultTo: 'MB', toolUrl: '/data-storage' },
  { id: 'cooking', label: 'Cooking', conversionType: 'cooking', units: cookingUnits, defaultFrom: 'cup', defaultTo: 'ml', toolUrl: '/cooking' },
  { id: 'angle', label: 'Angle', conversionType: 'angle', units: angleUnits, defaultFrom: 'deg', defaultTo: 'rad', toolUrl: '/angle' },
];

export function getConversionCategory(id: string): ConversionCategory {
  return CONVERSION_CATEGORIES.find((entry) => entry.id === id) ?? CONVERSION_CATEGORIES[0];
}
