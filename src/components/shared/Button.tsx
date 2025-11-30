'use client';

import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = "btn";
    
    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary", 
      outline: "btn-outline",
      ghost: "btn-ghost",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow-md",
      warning: "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 shadow-sm hover:shadow-md",
      error: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md"
    };
    
    const sizeClasses = {
      sm: "btn-sm",
      md: "btn-md", 
      lg: "btn-lg",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          loading && "opacity-75 cursor-not-allowed",
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="loading-spinner h-4 w-4 mr-2" />
        )}
        {!loading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
