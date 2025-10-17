'use client';

import { ConversionResult, ConversionType } from '@/types/conversions';
import {
    convertArea,
    convertCooking,
    convertFuelEconomy,
    convertHeight,
    convertLength,
    convertPower,
    convertSpeed,
    convertTemperature,
    convertWeight
} from '@/utils/conversions';
import { validateConversionInput } from '@/utils/validation';
import { useCallback, useMemo, useState } from 'react';

interface UseConverterProps {
  conversionType: ConversionType;
  availableUnits: string[];
}

export function useConverter({ conversionType, availableUnits }: UseConverterProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');
  const [error, setError] = useState<string>('');

  const convertValue = useCallback((value: number, from: string, to: string): number => {
    switch (conversionType) {
      case 'length':
        return convertLength(value, from, to);
      case 'weight':
        return convertWeight(value, from, to);
      case 'temperature':
        return convertTemperature(value, from, to);
      case 'area':
        return convertArea(value, from, to);
      case 'speed':
        return convertSpeed(value, from, to);
      case 'height':
        return convertHeight(value, from, to);
      case 'cooking':
        return convertCooking(value, from, to);
      case 'fuelEconomy':
        return convertFuelEconomy(value, from, to);
      case 'power':
        return convertPower(value, from, to);
      case 'fitnessWeight':
        return convertWeight(value, from, to);
      case 'bmi': {
        // Special case for BMI calculation
        const heightM = Number(to) / 100;
        if (heightM > 0) {
          return value / (heightM * heightM);
        }
        return 0;
      }
      default:
        return 0;
    }
  }, [conversionType]);

  const result = useMemo((): ConversionResult => {
    if (!inputValue || !fromUnit || !toUnit) {
      return {
        value: 0,
        fromUnit: '',
        toUnit: '',
        result: 0,
        isValid: false,
        error: 'Please fill in all fields'
      };
    }

    // Validate input
    const validation = validateConversionInput(inputValue, fromUnit, toUnit, availableUnits);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid input');
      return {
        value: 0,
        fromUnit,
        toUnit,
        result: 0,
        isValid: false,
        error: validation.error
      };
    }

    try {
      const numValue = Number(inputValue);
      const convertedValue = convertValue(numValue, fromUnit, toUnit);
      
      setError('');
      return {
        value: numValue,
        fromUnit,
        toUnit,
        result: convertedValue,
        isValid: true
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
      return {
        value: Number(inputValue),
        fromUnit,
        toUnit,
        result: 0,
        isValid: false,
        error: errorMessage
      };
    }
  }, [inputValue, fromUnit, toUnit, convertValue, availableUnits]);

  const reset = useCallback(() => {
    setInputValue('');
    setFromUnit('');
    setToUnit('');
    setError('');
  }, []);

  const copyResult = useCallback(async (): Promise<boolean> => {
    if (!result.isValid) return false;
    
    try {
      await navigator.clipboard.writeText(result.result.toString());
      return true;
    } catch (err) {
      console.error('Failed to copy result:', err);
      return false;
    }
  }, [result]);

  return {
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
  };
}
