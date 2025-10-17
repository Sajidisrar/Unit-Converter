// Centralized error handling utilities
export interface AppError {
  message: string;
  code: string;
  field?: string;
  timestamp: Date;
}

export class ConversionError extends Error {
  public code: string;
  public field?: string;

  constructor(message: string, code: string, field?: string) {
    super(message);
    this.name = 'ConversionError';
    this.code = code;
    this.field = field;
  }
}

export function handleConversionError(error: unknown): AppError {
  if (error instanceof ConversionError) {
    return {
      message: error.message,
      code: error.code,
      field: error.field,
      timestamp: new Date()
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
      timestamp: new Date()
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    timestamp: new Date()
  };
}

export function createConversionError(message: string, code: string, field?: string): ConversionError {
  return new ConversionError(message, code, field);
}

// Common error codes
export const ERROR_CODES = {
  INVALID_INPUT: 'INVALID_INPUT',
  INVALID_UNIT: 'INVALID_UNIT',
  CONVERSION_FAILED: 'CONVERSION_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR'
} as const;

// User-friendly error messages
export const ERROR_MESSAGES = {
  [ERROR_CODES.INVALID_INPUT]: 'Please enter a valid number',
  [ERROR_CODES.INVALID_UNIT]: 'Please select a valid unit',
  [ERROR_CODES.CONVERSION_FAILED]: 'Conversion failed. Please check your input.',
  [ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection.',
  [ERROR_CODES.VALIDATION_ERROR]: 'Input validation failed'
} as const;
