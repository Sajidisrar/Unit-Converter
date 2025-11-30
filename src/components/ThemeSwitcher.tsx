'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import Button from '@/components/shared/Button'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      >
        <path d="M12 3v1" />
        <path d="M12 20v1" />
        <path d="m4.93 4.93 0.71 0.71" />
        <path d="m18.36 18.36 0.71 0.71" />
        <path d="M1 12h1" />
        <path d="M22 12h1" />
        <path d="m4.93 19.07 0.71-0.71" />
        <path d="m18.36 5.64 0.71-0.71" />
        <circle cx="12" cy="12" r="5" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
