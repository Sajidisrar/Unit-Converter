'use client';

import { cn } from '@/utils/cn';
import type { QuizAnswer } from '@/types/aws-exam';

interface QuizNavigationProps {
  totalQuestions: number;
  answers: Record<number, QuizAnswer>;
  currentIndex: number;
  onGoToQuestion: (index: number) => void;
}

export default function QuizNavigation({
  totalQuestions,
  answers,
  currentIndex,
  onGoToQuestion,
}: QuizNavigationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Question Navigator
      </h3>

      <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const answer = answers[i];
          const isCurrent = i === currentIndex;
          const isAnswered = answer?.selectedAnswer !== null && answer?.selectedAnswer !== undefined;
          const isFlagged = answer?.isFlagged ?? false;

          return (
            <button
              key={i}
              onClick={() => onGoToQuestion(i)}
              className={cn(
                'w-full aspect-square rounded-lg text-xs font-bold transition-all duration-150 relative',
                'flex items-center justify-center',
                isCurrent && 'bg-blue-500 text-white shadow-md ring-2 ring-blue-300 dark:ring-blue-700',
                !isCurrent && isAnswered && 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700',
                !isCurrent && !isAnswered && 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600',
                isFlagged && !isCurrent && 'ring-2 ring-amber-400 dark:ring-amber-500',
              )}
              title={`Question ${i + 1}${isFlagged ? ' (flagged)' : ''}${isAnswered ? ' (answered)' : ''}`}
            >
              {i + 1}
              {isFlagged && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="w-4 h-4 rounded bg-blue-500" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600" />
          <span>Unanswered</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-700 ring-2 ring-amber-400 relative">
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full" />
          </span>
          <span>Flagged</span>
        </div>
      </div>
    </div>
  );
}
