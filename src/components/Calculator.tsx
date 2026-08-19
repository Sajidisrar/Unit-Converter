'use client';

import { ConversionType } from '@/types/conversions';
import { convertByType } from '@/utils/conversions';
import { validateNumberInput } from '@/utils/validation';
import { useCallback, useEffect, useState } from 'react';

interface Unit {
  label: string;
  value: string;
}

interface CalculatorProps {
  title: string;
  units: Unit[];
  conversionType: ConversionType;
  initialFromUnit?: string;
}

export default function Calculator({ title, units, conversionType, initialFromUnit }: CalculatorProps) {
  // const searchParams = useSearchParams();
  // const fromParam = searchParams.get("from");
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>(initialFromUnit || units[0]?.value || '');
  const [toUnit, setToUnit] = useState<string>(units[1]?.value || '');
  const [result, setResult] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // For BMI inputs
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');

  // Conversion functions
  const convertValue = useCallback((value: number, fromUnit: string, toUnit: string): number => {
    return convertByType(conversionType, value, fromUnit, toUnit);
  }, [conversionType]);

  // Auto convert on change
  useEffect(() => {
    if (conversionType === 'bmi') {
      const weight = Number(weightKg);
      const height = Number(heightCm);
      if (weight > 0 && height > 0) {
        const bmiValue = convertValue(weight, heightCm, heightCm);
        setResult(bmiValue);
      } else {
        setResult(0);
      }
    } else {
      if (inputValue && fromUnit && toUnit) {
        const validation = validateNumberInput(inputValue);
        if (validation.isValid) {
          const convertedValue = convertValue(Number(inputValue), fromUnit, toUnit);
          setResult(convertedValue);
        } else {
          setResult(0);
        }
      } else {
        setResult(0);
      }
    }
  }, [inputValue, fromUnit, toUnit, conversionType, convertValue, weightKg, heightCm]);

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.toString());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Failed to copy - user can manually copy the result
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

  // BMI category helper
  const getBmiCategory = (bmi: number): string => {
    if (bmi === 0) return '';
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
        {title}
      </h2>

      <div className="space-y-5">
        {/* Input Section */}
        {conversionType === 'bmi' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="weightKg" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Weight (kg)
              </label>
              <input
                id="weightKg"
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="e.g. 70"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>
            <div>
              <label htmlFor="heightCm" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Height (cm)
              </label>
              <input
                id="heightCm"
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="e.g. 175"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>
          </div>
        ) : (
          <>
            {/* Value Input */}
            <div>
              <label htmlFor="inputValue" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Value
              </label>
              <input
                id="inputValue"
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter a number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>

            {/* Unit Selection Row */}
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  From
                </label>
                <select
                  id="fromUnit"
                  value={fromUnit}
                  onChange={handleFromUnitChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <button
                onClick={swapUnits}
                className="shrink-0 w-10 h-10 mb-0.5 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
                title="Swap units"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>

              <div className="flex-1">
                <label htmlFor="toUnit" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                  To
                </label>
                <select
                  id="toUnit"
                  value={toUnit}
                  onChange={handleToUnitChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {/* Result Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-5 border border-blue-100 dark:border-blue-900/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Result</span>
            <button
              onClick={copyToClipboard}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                isCopied
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="text-center py-2">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
              {result === 0 ? '--' : result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            </div>
            {conversionType === 'bmi' ? (
              <div className={`text-sm font-medium ${
                result === 0 ? 'text-gray-400' :
                result < 18.5 ? 'text-blue-600 dark:text-blue-400' :
                result < 25 ? 'text-green-600 dark:text-green-400' :
                result < 30 ? 'text-yellow-600 dark:text-yellow-400' :
                'text-red-600 dark:text-red-400'
              }`}>
                {getBmiCategory(result)}
              </div>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {units.find(unit => unit.value === toUnit)?.label}
              </div>
            )}
          </div>
        </div>

        {/* Conversion Summary */}
        {conversionType !== 'bmi' && inputValue && fromUnit && toUnit && !isNaN(Number(inputValue)) && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 rounded-lg py-3 px-4">
            <span className="font-medium text-gray-700 dark:text-gray-300">{inputValue}</span> {units.find(unit => unit.value === fromUnit)?.label} = <span className="font-medium text-gray-700 dark:text-gray-300">{result.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span> {units.find(unit => unit.value === toUnit)?.label}
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
