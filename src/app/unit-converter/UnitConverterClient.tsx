'use client';

import { useState } from 'react';
import Calculator from '@/components/Calculator';
import TabContainer from '@/components/shared/TabContainer';
import AdBanner from '@/components/AdBanner';
import DeveloperToolsNav from '@/components/DeveloperToolsNav';
import {
  lengthUnits,
  weightUnits,
  temperatureUnits,
  areaUnits,
  speedUnits
} from '@/utils/conversions';
import { ConversionType } from '@/types/conversions';

const converterTabs = [
  { id: 'length', label: 'Length', icon: '📏' },
  { id: 'weight', label: 'Weight', icon: '⚖️' },
  { id: 'temperature', label: 'Temperature', icon: '🌡️' },
  { id: 'area', label: 'Area', icon: '📐' },
  { id: 'speed', label: 'Speed', icon: '🏃' },
];

const converterConfigs = {
  length: {
    title: 'Length Converter',
    units: lengthUnits,
    conversionType: 'length' as ConversionType,
    defaultUnit: 'm',
    description: 'Convert between meters, feet, inches, kilometers, miles, and more.'
  },
  weight: {
    title: 'Weight Converter',
    units: weightUnits,
    conversionType: 'weight' as ConversionType,
    defaultUnit: 'kg',
    description: 'Convert between kilograms, pounds, ounces, grams, and more.'
  },
  temperature: {
    title: 'Temperature Converter',
    units: temperatureUnits,
    conversionType: 'temperature' as ConversionType,
    defaultUnit: 'c',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin.'
  },
  area: {
    title: 'Area Converter',
    units: areaUnits,
    conversionType: 'area' as ConversionType,
    defaultUnit: 'm2',
    description: 'Convert between square meters, square feet, acres, hectares, and more.'
  },
  speed: {
    title: 'Speed Converter',
    units: speedUnits,
    conversionType: 'speed' as ConversionType,
    defaultUnit: 'km/h',
    description: 'Convert between km/h, mph, knots, mach, and more.'
  }
};

export default function UnitConverterClient() {
  const [activeTab, setActiveTab] = useState<string>('length');

  const config = converterConfigs[activeTab as keyof typeof converterConfigs];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Unit Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Free online unit converter for length, weight, temperature, area, and speed. Instant, accurate conversions with our easy-to-use calculator.
          </p>
        </header>

        {/* Main Tool */}
        <main className="max-w-6xl mx-auto">
          {/* Ad Banner - Top */}
          <div className="mb-4">
            <AdBanner position="top" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6">
            {/* Tab Navigation */}
            <TabContainer
              tabs={converterTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              accentColor="blue"
            />

            {/* Active Converter Info */}
            <div className="mt-4 mb-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{config.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
            </div>

            {/* Calculator */}
            <Calculator
              title={config.title}
              units={config.units}
              conversionType={config.conversionType}
              initialFromUnit={config.defaultUnit}
            />
          </div>

          {/* Quick Reference */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Conversion Reference</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">📏 Length</h3>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>1 inch = 2.54 cm</li>
                  <li>1 foot = 30.48 cm</li>
                  <li>1 mile = 1.609 km</li>
                  <li>1 meter = 3.281 feet</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">⚖️ Weight</h3>
                <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>1 pound = 453.6 g</li>
                  <li>1 ounce = 28.35 g</li>
                  <li>1 kg = 2.205 pounds</li>
                  <li>1 stone = 14 pounds</li>
                </ul>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">🌡️ Temperature</h3>
                <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                  <li>0°C = 32°F = 273.15K</li>
                  <li>100°C = 212°F = 373.15K</li>
                  <li>°F = °C × 9/5 + 32</li>
                  <li>°C = (°F - 32) × 5/9</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">📐 Area</h3>
                <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                  <li>1 acre = 4,047 m²</li>
                  <li>1 hectare = 10,000 m²</li>
                  <li>1 sq mile = 640 acres</li>
                  <li>1 sq foot = 0.093 m²</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">🏃 Speed</h3>
                <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                  <li>1 mph = 1.609 km/h</li>
                  <li>1 knot = 1.852 km/h</li>
                  <li>Mach 1 = 1,235 km/h</li>
                  <li>1 m/s = 3.6 km/h</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About Unit Conversion</h2>

            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <p>
                Our free online unit converter helps you quickly and accurately convert between different measurement systems.
                Whether you need to convert metric to imperial units, calculate temperature differences, or determine area and speed conversions,
                our tool provides instant results with high precision.
              </p>

              <p>
                The converter supports both <strong>metric units</strong> (meters, kilograms, Celsius) used internationally,
                and <strong>imperial units</strong> (feet, pounds, Fahrenheit) commonly used in the United States.
                All calculations happen instantly in your browser with no server requests, ensuring privacy and speed.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I convert meters to feet?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">To convert meters to feet, multiply the number of meters by 3.28084. For example, 5 meters = 5 × 3.28084 = 16.404 feet. Our converter does this instantly - enter the value, select meters and feet, and get the result.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is the formula to convert Celsius to Fahrenheit?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">To convert Celsius to Fahrenheit, multiply by 9/5 and add 32. The formula is: °F = (°C × 9/5) + 32. For example, 25°C = (25 × 9/5) + 32 = 77°F. To convert back: °C = (°F - 32) × 5/9.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How many pounds are in a kilogram?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">One kilogram equals approximately 2.205 pounds (lbs). To convert kg to lbs, multiply the weight in kilograms by 2.205. Conversely, to convert pounds to kg, divide by 2.205 or multiply by 0.4536.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is the difference between metric and imperial units?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Metric system (SI) uses base-10 units like meters, grams, and liters, used worldwide. Imperial system uses feet, pounds, and gallons, primarily in the US. Metric is easier for calculations due to decimal-based conversions.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I convert miles per hour to kilometers per hour?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">To convert mph to km/h, multiply by 1.60934. For example, 60 mph = 60 × 1.60934 = 96.56 km/h. To convert km/h to mph, divide by 1.60934 or multiply by 0.621371.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How many square feet are in an acre?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">One acre equals exactly 43,560 square feet. An acre is also equal to 4,047 square meters or 0.4047 hectares. One square mile contains 640 acres.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">What is absolute zero in Celsius and Fahrenheit?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Absolute zero, the coldest possible temperature, is -273.15°C or -459.67°F (0 Kelvin). At this temperature, all molecular motion stops. Water freezes at 0°C (32°F) and boils at 100°C (212°F) at standard pressure.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">How do I convert inches to centimeters?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">To convert inches to centimeters, multiply by 2.54. For example, 10 inches = 10 × 2.54 = 25.4 cm. This is an exact conversion factor. To convert cm to inches, divide by 2.54.</p>
              </div>
            </div>
          </div>

          {/* Developer Tools Navigation */}
          <DeveloperToolsNav currentPath="/unit-converter" />
        </main>
      </div>
    </div>
  );
}
