'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  convertLength, 
  convertWeight, 
  convertTemperature, 
  convertArea, 
  convertSpeed 
} from '@/utils/conversions';

interface Unit {
  label: string;
  value: string;
}

interface CalculatorProps {
  title: string;
  units: Unit[];
  conversionType: 'length' | 'weight' | 'temperature' | 'area' | 'speed';
}

export default function Calculator({ title, units, conversionType }: CalculatorProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>(units[0]?.value || '');
  const [toUnit, setToUnit] = useState<string>(units[1]?.value || '');
  const [result, setResult] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Conversion functions
  const convertValue = useCallback((value: number, fromUnit: string, toUnit: string): number => {
    switch (conversionType) {
      case 'length':
        return convertLength(value, fromUnit, toUnit);
      case 'weight':
        return convertWeight(value, fromUnit, toUnit);
      case 'temperature':
        return convertTemperature(value, fromUnit, toUnit);
      case 'area':
        return convertArea(value, fromUnit, toUnit);
      case 'speed':
        return convertSpeed(value, fromUnit, toUnit);
      default:
        return 0;
    }
  }, [conversionType]);

  // Auto convert on change
  useEffect(() => {
    if (inputValue && fromUnit && toUnit && !isNaN(Number(inputValue))) {
      const convertedValue = convertValue(Number(inputValue), fromUnit, toUnit);
      setResult(convertedValue);
    } else {
      setResult(0);
    }
  }, [inputValue, fromUnit, toUnit, conversionType, convertValue]);

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.toString());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  // Handle from unit change
  const handleFromUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUnit(e.target.value);
  };

  // Handle to unit change
  const handleToUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUnit(e.target.value);
  };

  // Swap units
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        {title}
      </h2>
      
      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label htmlFor="inputValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Value
            </label>
            <input
              id="inputValue"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a value to convert"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Unit Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                From Unit
              </label>
              <select
                id="fromUnit"
                value={fromUnit}
                onChange={handleFromUnitChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="toUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                To Unit
              </label>
              <select
                id="toUnit"
                value={toUnit}
                onChange={handleToUnitChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Swap Units</span>
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Result</h3>
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                isCopied
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-400'
              }`}
            >
              {isCopied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Result</span>
                </>
              )}
            </button>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {result.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {units.find(unit => unit.value === toUnit)?.label}
            </div>
          </div>
        </div>

        {/* Conversion Formula Display */}
        {inputValue && fromUnit && toUnit && !isNaN(Number(inputValue)) && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Conversion</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {inputValue} {units.find(unit => unit.value === fromUnit)?.label} = {result.toLocaleString()} {units.find(unit => unit.value === toUnit)?.label}
            </p>
          </div>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": title,
            "applicationCategory": conversionType,
            "operatingSystem": "Web",
            "description": `A ${conversionType} unit converter application named ${title}.`
          })
        }}
      />
    </div>
  );
}
