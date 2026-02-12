'use client';

import { cn } from '@/utils/cn';
import { formatTime } from '@/utils/awsExamUtils';

interface QuizTimerProps {
  timeRemainingSeconds: number;
}

export default function QuizTimer({ timeRemainingSeconds }: QuizTimerProps) {
  const isWarning = timeRemainingSeconds <= 600 && timeRemainingSeconds > 300;
  const isDanger = timeRemainingSeconds <= 300;

  return (
    <div
      className={cn(
        'flex items-center gap-2 font-mono text-lg font-bold px-4 py-2 rounded-lg',
        isDanger && 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 animate-pulse',
        isWarning && 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
        !isWarning && !isDanger && 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700'
      )}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{formatTime(timeRemainingSeconds)}</span>
    </div>
  );
}
