import { describe, expect, it } from 'vitest';
import {
  calculateBMI,
  convertAngle,
  convertArea,
  convertCooking,
  convertDataStorage,
  convertEnergy,
  convertFuelEconomy,
  convertHeight,
  convertLength,
  convertPower,
  convertPressure,
  convertSpeed,
  convertTemperature,
  convertTime,
  convertVolume,
  convertWeight,
  getBMICategory,
} from './conversions';

// Digit count for values that are exact by definition. toBeCloseTo treats
// its second argument as decimal places, so this asserts agreement to within
// 5e-11. Anything failing here has a rounded constant, not a float artefact.
const EXACT = 10;

describe('convertLength', () => {
  it('round-trips through the base unit', () => {
    expect(convertLength(1, 'm', 'm')).toBeCloseTo(1, 12);
  });

  // Defined exactly: 1 in = 25.4 mm, so 1 m = 39.3700787... in
  it('converts metres to feet', () => {
    expect(convertLength(1, 'm', 'ft')).toBeCloseTo(3.280839895013123, 9);
  });

  it('converts inches to centimetres exactly', () => {
    expect(convertLength(1, 'in', 'cm')).toBeCloseTo(2.54, EXACT);
  });

  it('converts miles to kilometres exactly', () => {
    expect(convertLength(1, 'mi', 'km')).toBeCloseTo(1.609344, EXACT);
  });

  it('converts nautical miles to metres exactly', () => {
    expect(convertLength(1, 'nmi', 'm')).toBeCloseTo(1852, EXACT);
  });
});

describe('convertWeight', () => {
  // 1 lb = 0.45359237 kg exactly
  it('converts kilograms to pounds', () => {
    expect(convertWeight(1, 'kg', 'lb')).toBeCloseTo(2.2046226218487757, 6);
  });

  it('converts pounds to kilograms exactly', () => {
    expect(convertWeight(1, 'lb', 'kg')).toBeCloseTo(0.45359237, EXACT);
  });

  // 1 oz = 28.349523125 g exactly
  it('converts ounces to grams exactly', () => {
    expect(convertWeight(1, 'oz', 'g')).toBeCloseTo(28.349523125, EXACT);
  });

  // 1 stone = 14 lb exactly
  it('converts stone to pounds exactly', () => {
    expect(convertWeight(1, 'st', 'lb')).toBeCloseTo(14, EXACT);
  });

  it('converts tonnes to kilograms exactly', () => {
    expect(convertWeight(1, 't', 'kg')).toBeCloseTo(1000, EXACT);
  });
});

describe('convertTemperature', () => {
  it('converts the freezing point of water', () => {
    expect(convertTemperature(0, 'c', 'f')).toBeCloseTo(32, EXACT);
  });

  it('converts the boiling point of water', () => {
    expect(convertTemperature(100, 'c', 'f')).toBeCloseTo(212, EXACT);
  });

  it('handles the point where the scales cross', () => {
    expect(convertTemperature(-40, 'c', 'f')).toBeCloseTo(-40, EXACT);
  });

  it('converts absolute zero to Celsius', () => {
    expect(convertTemperature(0, 'k', 'c')).toBeCloseTo(-273.15, EXACT);
  });

  it('converts Fahrenheit to Kelvin', () => {
    expect(convertTemperature(32, 'f', 'k')).toBeCloseTo(273.15, EXACT);
  });

  it('round-trips Celsius through Fahrenheit', () => {
    const roundTrip = convertTemperature(convertTemperature(37, 'c', 'f'), 'f', 'c');
    expect(roundTrip).toBeCloseTo(37, 9);
  });
});

describe('convertArea', () => {
  it('converts square metres to square feet', () => {
    expect(convertArea(1, 'm2', 'ft2')).toBeCloseTo(10.763910416709722, 4);
  });

  // 1 acre = 4046.8564224 m² exactly
  it('converts acres to square metres exactly', () => {
    expect(convertArea(1, 'ac', 'm2')).toBeCloseTo(4046.8564224, EXACT);
  });

  it('converts hectares to square metres exactly', () => {
    expect(convertArea(1, 'ha', 'm2')).toBeCloseTo(10000, EXACT);
  });

  // 1 acre = 1/640 square mile exactly
  it('relates acres to square miles exactly', () => {
    expect(convertArea(640, 'ac', 'mi2')).toBeCloseTo(1, 9);
  });
});

describe('convertSpeed', () => {
  // 1 m/s = 3.6 km/h exactly
  it('converts metres per second to kilometres per hour exactly', () => {
    expect(convertSpeed(1, 'm/s', 'km/h')).toBeCloseTo(3.6, EXACT);
  });

  // 1 mph = 1.609344 km/h exactly
  it('converts miles per hour to kilometres per hour exactly', () => {
    expect(convertSpeed(1, 'mph', 'km/h')).toBeCloseTo(1.609344, EXACT);
  });

  // 1 knot = 1.852 km/h exactly
  it('converts knots to kilometres per hour exactly', () => {
    expect(convertSpeed(1, 'knot', 'km/h')).toBeCloseTo(1.852, EXACT);
  });
});

describe('convertCooking', () => {
  it('converts litres to millilitres exactly', () => {
    expect(convertCooking(1, 'l', 'ml')).toBeCloseTo(1000, EXACT);
  });

  it('uses the 240 ml metric cup', () => {
    expect(convertCooking(1, 'cup', 'ml')).toBeCloseTo(240, EXACT);
  });

  it('holds 3 teaspoons to the tablespoon', () => {
    expect(convertCooking(3, 'tsp', 'tbsp')).toBeCloseTo(1, 4);
  });

  // 1 US fl oz = 29.5735295625 ml exactly
  it('converts fluid ounces to millilitres', () => {
    expect(convertCooking(1, 'fl oz', 'ml')).toBeCloseTo(29.5735295625, 4);
  });
});

describe('convertHeight', () => {
  it('converts feet to centimetres exactly', () => {
    expect(convertHeight(1, 'ft', 'cm')).toBeCloseTo(30.48, EXACT);
  });

  it('converts a 5ft 10in person to centimetres', () => {
    expect(convertHeight(70, 'in', 'cm')).toBeCloseTo(177.8, 9);
  });
});

describe('convertFuelEconomy', () => {
  // The non-linear path: these are reciprocal, not proportional.
  it('converts L/100km to km/L reciprocally', () => {
    expect(convertFuelEconomy(10, 'L/100km', 'km/L')).toBeCloseTo(10, 9);
    expect(convertFuelEconomy(5, 'L/100km', 'km/L')).toBeCloseTo(20, 9);
  });

  it('converts US mpg to L/100km', () => {
    expect(convertFuelEconomy(30, 'mpgUS', 'L/100km')).toBeCloseTo(7.8405, 3);
  });

  it('keeps UK mpg larger than US mpg for the same consumption', () => {
    const uk = convertFuelEconomy(8, 'L/100km', 'mpgUK');
    const us = convertFuelEconomy(8, 'L/100km', 'mpgUS');
    expect(uk).toBeGreaterThan(us);
  });

  it('round-trips US mpg', () => {
    const roundTrip = convertFuelEconomy(
      convertFuelEconomy(35, 'mpgUS', 'L/100km'), 'L/100km', 'mpgUS');
    expect(roundTrip).toBeCloseTo(35, 9);
  });
});

describe('convertPower', () => {
  it('converts kilowatts to watts exactly', () => {
    expect(convertPower(1, 'kW', 'W')).toBeCloseTo(1000, EXACT);
  });

  // 1 mechanical hp = 745.6998715822702 W
  it('converts horsepower to watts', () => {
    expect(convertPower(1, 'hp', 'W')).toBeCloseTo(745.6998715822702, 3);
  });

  // 1 metric hp = 735.49875 W exactly
  it('converts metric horsepower to watts', () => {
    expect(convertPower(1, 'hp_metric', 'W')).toBeCloseTo(735.49875, 2);
  });

  it('converts BTU/h to watts', () => {
    expect(convertPower(1, 'BTU/h', 'W')).toBeCloseTo(0.29307107, 5);
  });
});

describe('BMI', () => {
  it('computes a known BMI', () => {
    expect(calculateBMI(70, 175)).toBeCloseTo(22.857142857, 6);
  });

  it('categorises against the WHO thresholds', () => {
    expect(getBMICategory(17)).toBe('Underweight');
    expect(getBMICategory(22)).toBe('Normal weight');
    expect(getBMICategory(27)).toBe('Overweight');
    expect(getBMICategory(32)).toBe('Obesity');
  });

  // WHO defines normal as under 25 and overweight as under 30. Values in the
  // 24.9-25.0 and 29.9-30.0 gaps must not fall through to the next band up.
  it('treats the band boundaries as WHO defines them', () => {
    expect(getBMICategory(24.95)).toBe('Normal weight');
    expect(getBMICategory(29.95)).toBe('Overweight');
  });
});

describe('convertVolume', () => {
  it('converts litres to millilitres exactly', () => {
    expect(convertVolume(1, 'l', 'ml')).toBeCloseTo(1000, EXACT);
  });

  // 1 US gallon = 3.785411784 L exactly
  it('converts US gallons to litres exactly', () => {
    expect(convertVolume(1, 'galUS', 'l')).toBeCloseTo(3.785411784, EXACT);
  });

  // 1 imperial gallon = 4.54609 L exactly
  it('converts UK gallons to litres exactly', () => {
    expect(convertVolume(1, 'galUK', 'l')).toBeCloseTo(4.54609, EXACT);
  });

  it('keeps the imperial gallon larger than the US gallon', () => {
    expect(convertVolume(1, 'galUK', 'l')).toBeGreaterThan(convertVolume(1, 'galUS', 'l'));
  });

  // A US gallon is 8 pints, 4 quarts, 128 fluid ounces
  it('holds the US gallon subdivisions', () => {
    expect(convertVolume(1, 'galUS', 'ptUS')).toBeCloseTo(8, 9);
    expect(convertVolume(1, 'galUS', 'qtUS')).toBeCloseTo(4, 9);
    expect(convertVolume(1, 'galUS', 'flozUS')).toBeCloseTo(128, 9);
  });

  // An imperial gallon is 8 pints of 20 fluid ounces
  it('holds the imperial gallon subdivisions', () => {
    expect(convertVolume(1, 'galUK', 'ptUK')).toBeCloseTo(8, 9);
    expect(convertVolume(1, 'galUK', 'flozUK')).toBeCloseTo(160, 9);
  });

  it('converts cubic metres to litres exactly', () => {
    expect(convertVolume(1, 'm3', 'l')).toBeCloseTo(1000, EXACT);
  });

  it('holds 1728 cubic inches to the cubic foot', () => {
    expect(convertVolume(1, 'ft3', 'in3')).toBeCloseTo(1728, 6);
  });
});

describe('convertDataStorage', () => {
  it('converts bytes to bits exactly', () => {
    expect(convertDataStorage(1, 'B', 'bit')).toBeCloseTo(8, EXACT);
  });

  it('uses decimal prefixes for kB', () => {
    expect(convertDataStorage(1, 'kB', 'B')).toBeCloseTo(1000, EXACT);
  });

  it('uses binary prefixes for KiB', () => {
    expect(convertDataStorage(1, 'KiB', 'B')).toBeCloseTo(1024, EXACT);
  });

  // The decimal/binary gap is why "1 TB" drives show as ~931 GiB
  it('reproduces the drive-capacity discrepancy', () => {
    expect(convertDataStorage(1, 'TB', 'GiB')).toBeCloseTo(931.3225746154785, 6);
  });

  it('converts gibibytes to bytes exactly', () => {
    expect(convertDataStorage(1, 'GiB', 'B')).toBeCloseTo(1073741824, EXACT);
  });
});

describe('convertTime', () => {
  it('converts hours to minutes exactly', () => {
    expect(convertTime(1, 'h', 'min')).toBeCloseTo(60, EXACT);
  });

  it('converts days to seconds exactly', () => {
    expect(convertTime(1, 'day', 's')).toBeCloseTo(86400, EXACT);
  });

  it('converts weeks to days exactly', () => {
    expect(convertTime(1, 'week', 'day')).toBeCloseTo(7, EXACT);
  });

  // Average Gregorian year: 365.2425 days
  it('uses the average Gregorian year', () => {
    expect(convertTime(1, 'year', 'day')).toBeCloseTo(365.2425, 6);
  });

  it('holds twelve average months to the average year', () => {
    expect(convertTime(1, 'year', 'month')).toBeCloseTo(12, 6);
  });
});

describe('convertPressure', () => {
  it('converts bar to pascals exactly', () => {
    expect(convertPressure(1, 'bar', 'Pa')).toBeCloseTo(100000, EXACT);
  });

  it('converts atmospheres to pascals exactly', () => {
    expect(convertPressure(1, 'atm', 'Pa')).toBeCloseTo(101325, EXACT);
  });

  // 1 atm = 760 torr by definition
  it('holds 760 torr to the atmosphere', () => {
    expect(convertPressure(1, 'atm', 'torr')).toBeCloseTo(760, 9);
  });

  it('converts psi to pascals', () => {
    expect(convertPressure(1, 'psi', 'Pa')).toBeCloseTo(6894.757293168361, 6);
  });

  // Typical car tyre pressure, a common real-world lookup
  it('converts 32 psi to bar', () => {
    expect(convertPressure(32, 'psi', 'bar')).toBeCloseTo(2.2063, 4);
  });
});

describe('convertEnergy', () => {
  it('converts kilowatt hours to joules exactly', () => {
    expect(convertEnergy(1, 'kWh', 'J')).toBeCloseTo(3600000, EXACT);
  });

  it('converts kilocalories to kilojoules exactly', () => {
    expect(convertEnergy(1, 'kcal', 'kJ')).toBeCloseTo(4.184, EXACT);
  });

  it('converts watt hours to joules exactly', () => {
    expect(convertEnergy(1, 'Wh', 'J')).toBeCloseTo(3600, EXACT);
  });

  it('converts BTU to joules', () => {
    expect(convertEnergy(1, 'BTU', 'J')).toBeCloseTo(1055.05585262, 6);
  });

  it('converts electronvolts to joules', () => {
    expect(convertEnergy(1, 'eV', 'J')).toBeCloseTo(1.602176634e-19, 25);
  });
});

describe('convertAngle', () => {
  it('converts a full turn to degrees', () => {
    expect(convertAngle(1, 'turn', 'deg')).toBeCloseTo(360, 9);
  });

  it('converts radians to degrees', () => {
    expect(convertAngle(Math.PI, 'rad', 'deg')).toBeCloseTo(180, 9);
  });

  it('holds 400 gradians to the turn', () => {
    expect(convertAngle(1, 'turn', 'grad')).toBeCloseTo(400, 9);
  });

  it('holds 60 arcminutes to the degree', () => {
    expect(convertAngle(1, 'deg', 'arcmin')).toBeCloseTo(60, 9);
  });

  it('holds 3600 arcseconds to the degree', () => {
    expect(convertAngle(1, 'deg', 'arcsec')).toBeCloseTo(3600, 9);
  });

  it('round-trips degrees through radians', () => {
    expect(convertAngle(convertAngle(45, 'deg', 'rad'), 'rad', 'deg')).toBeCloseTo(45, 9);
  });
});
