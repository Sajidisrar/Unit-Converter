'use client';

import { useMemo } from 'react';
import { cn } from '@/utils/cn';
import type { QuizState } from '@/types/aws-exam';
import { calculateScore, getModuleBreakdown } from '@/utils/awsExamUtils';
import QuestionReview from './QuestionReview';
import Button from '@/components/shared/Button';

interface ResultsViewProps {
  state: QuizState;
  onReset: () => void;
}

export default function ResultsView({ state, onReset }: ResultsViewProps) {
  const score = useMemo(() => calculateScore(state), [state]);
  const breakdown = useMemo(() => getModuleBreakdown(state), [state]);

  const timeTaken = state.startedAt && state.completedAt
    ? Math.round((state.completedAt - state.startedAt) / 1000)
    : null;

  const timeTakenFormatted = timeTaken
    ? `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`
    : '—';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Pass/Fail banner */}
      <div
        className={cn(
          'rounded-xl p-8 text-center shadow-lg',
          score.passed
            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
            : 'bg-gradient-to-br from-red-500 to-rose-600'
        )}
      >
        <div className="text-6xl mb-4">{score.passed ? '🎉' : '📚'}</div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {score.passed ? 'Congratulations! You Passed!' : 'Keep Studying!'}
        </h2>
        <p className="text-white/80 text-lg">
          {score.passed
            ? 'You have demonstrated sufficient knowledge for the AWS AI Practitioner exam.'
            : 'Review the explanations below and focus on your weak areas.'}
        </p>
      </div>

      {/* Score card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold mb-2">
            <span className={score.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {score.scaledScore}
            </span>
            <span className="text-2xl text-gray-400 dark:text-gray-500"> / 1000</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Passing score: 700 | Your score: {score.percentageCorrect}% correct
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total', value: score.totalQuestions, color: 'text-gray-900 dark:text-white', bg: 'bg-gray-50 dark:bg-gray-750' },
            { label: 'Correct', value: score.correctCount, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
            { label: 'Incorrect', value: score.incorrectCount, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
            { label: 'Unanswered', value: score.unansweredCount, color: 'text-gray-500 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-750' },
            { label: 'Time', value: timeTakenFormatted, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          ].map((stat) => (
            <div key={stat.label} className={cn('rounded-lg p-4 text-center', stat.bg)}>
              <p className={cn('text-2xl font-bold', stat.color)}>{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Module breakdown */}
      {breakdown.length > 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Module Breakdown</h3>
          <div className="space-y-4">
            {breakdown.map((mod) => (
              <div key={mod.moduleId}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    M{mod.moduleId}: {mod.moduleName}
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {mod.correctCount}/{mod.totalQuestions} ({mod.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={cn(
                      'h-3 rounded-full transition-all duration-500',
                      mod.percentage >= 70 ? 'bg-green-500' : mod.percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
                    )}
                    style={{ width: `${mod.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="primary" size="lg" onClick={onReset}>
          Try Again
        </Button>
        <Button variant="outline" size="lg" onClick={onReset}>
          Back to Home
        </Button>
      </div>

      {/* Question review */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Question Review</h3>
        <QuestionReview questions={state.questions} answers={state.answers} />
      </div>
    </div>
  );
}
