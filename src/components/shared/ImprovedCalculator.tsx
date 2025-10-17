'use client';

import { useConverter } from '@/hooks/useConverter';
import { ConversionType } from '@/types/conversions';
import { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import InputField from './InputField';

interface Unit {
  label: string;
  value: string;
}

interface ImprovedCalculatorProps {
  title: string;
  units: Unit[];
  conversionType: ConversionType;
  initialFromUnit?: string;
  description?: string;
}

export default function ImprovedCalculator({ 
  title, 
  units, 
  conversionType, 
  initialFromUnit,
  description 
}: ImprovedCalculatorProps) {
  const [isCopied, setIsCopied] = useState(false);
  const availableUnits = units.map(unit => unit.value);
  
  const {
    inputValue,
    setInputValue,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    error,
    result,
    reset,
    copyResult
  } = useConverter({ conversionType, availableUnits });

  // Set initial values
  useEffect(() => {
    if (units.length > 0 && !fromUnit) {
      setFromUnit(initialFromUnit || units[0].value);
    }
    if (units.length > 1 && !toUnit) {
      setToUnit(units[1].value);
    }
  }, [units, fromUnit, toUnit, initialFromUnit, setFromUnit, setToUnit]);

  const handleCopy = async () => {
    const success = await copyResult();
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Value */}
          <InputField
            label="Enter Value"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Enter a number"
            type="number"
            error={error}
            showValidation={true}
          />

          {/* From Unit */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From Unit
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          {/* To Unit */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To Unit
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          {/* Result */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Result
            </label>
            <div className="relative">
              <input
                type="text"
                value={result.isValid ? result.result.toFixed(6) : '0'}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white pr-12"
              />
              <button
                onClick={handleCopy}
                disabled={!result.isValid}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy result"
              >
                {isCopied ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          >
            Reset
          </button>
          <button
            onClick={handleCopy}
            disabled={!result.isValid}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200"
          >
            {isCopied ? 'Copied!' : 'Copy Result'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
