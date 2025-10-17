'use client';

import { cn } from '@/utils/cn';
import { sanitizeInput, validateNumberInput } from '@/utils/validation';
import { forwardRef } from 'react';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: 'text' | 'number';
  disabled?: boolean;
  className?: string;
  showValidation?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 
    value, 
    onChange, 
    placeholder = '', 
    label, 
    error,
    success,
    hint,
    leftIcon,
    rightIcon,
    type = 'text',
    disabled = false,
    className = '',
    showValidation = true,
    variant = 'default',
    size = 'md'
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      
      if (type === 'number') {
        const sanitized = sanitizeInput(newValue);
        onChange(sanitized);
      } else {
        onChange(newValue);
      }
    };

    const handleBlur = () => {
      if (type === 'number' && showValidation) {
        const validation = validateNumberInput(value);
        if (!validation.isValid && value !== '') {
          // Could trigger error state here if needed
        }
      }
    };

    const variantClasses = {
      default: "input",
      filled: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600",
      outlined: "bg-transparent border-2 border-gray-300 dark:border-gray-600"
    };

    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-4 py-4 text-lg"
    };

    const stateClasses = error ? "input-error" : success ? "input-success" : "";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 dark:text-gray-500">{leftIcon}</span>
            </div>
          )}
          <input
            ref={ref}
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              variantClasses[variant],
              sizeClasses[size],
              stateClasses,
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              "focus-ring",
              className
            )}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400 dark:text-gray-500">{rightIcon}</span>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {success && (
          <p className="mt-1 text-sm text-green-600 dark:text-green-400 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {success}
          </p>
        )}
        {hint && !error && !success && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
