// Input validation and sanitization utilities
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string;
}

export function validateNumberInput(value: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, error: 'Input is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }

  if (!isFinite(numValue)) {
    return { isValid: false, error: 'Number must be finite' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Number must be positive' };
  }

  return { 
    isValid: true, 
    sanitizedValue: value.trim() 
  };
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[^\d.-]/g, ''); // Keep only numbers, dots, and dashes
}

export function validateUnit(unit: string, availableUnits: string[]): ValidationResult {
  if (!unit) {
    return { isValid: false, error: 'Please select a unit' };
  }

  if (!availableUnits.includes(unit)) {
    return { isValid: false, error: 'Invalid unit selected' };
  }

  return { isValid: true };
}

export function validateConversionInput(
  value: string, 
  fromUnit: string, 
  toUnit: string,
  availableUnits: string[]
): ValidationResult {
  const valueValidation = validateNumberInput(value);
  if (!valueValidation.isValid) {
    return valueValidation;
  }

  const fromUnitValidation = validateUnit(fromUnit, availableUnits);
  if (!fromUnitValidation.isValid) {
    return fromUnitValidation;
  }

  const toUnitValidation = validateUnit(toUnit, availableUnits);
  if (!toUnitValidation.isValid) {
    return toUnitValidation;
  }

  if (fromUnit === toUnit) {
    return { isValid: false, error: 'Source and target units must be different' };
  }

  return { isValid: true };
}

export function sanitizeJsonInput(input: string): string {
  return input
    .trim()
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .replace(/\s+/g, ' '); // Normalize whitespace
}

export function validateJsonInput(input: string): ValidationResult {
  if (!input || input.trim() === '') {
    return { isValid: false, error: 'JSON input is required' };
  }

  try {
    JSON.parse(input);
    return { isValid: true, sanitizedValue: input.trim() };
  } catch (error) {
    return { 
      isValid: false, 
      error: `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}
