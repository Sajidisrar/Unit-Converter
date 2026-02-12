'use client';

import { useState } from 'react';
import { cn } from '@/utils/cn';
import type { QuizQuestion, QuizAnswer } from '@/types/aws-exam';

type ReviewFilter = 'all' | 'incorrect' | 'unanswered' | 'flagged';

interface QuestionReviewProps {
  questions: QuizQuestion[];
  answers: Record<number, QuizAnswer>;
}

const optionKeys = ['A', 'B', 'C', 'D'] as const;

const filters: { id: ReviewFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'incorrect', label: 'Incorrect', icon: '❌' },
  { id: 'unanswered', label: 'Unanswered', icon: '⏭️' },
  { id: 'flagged', label: 'Flagged', icon: '🔖' },
];

export default function QuestionReview({ questions, answers }: QuestionReviewProps) {
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('incorrect');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const filteredIndices = questions.reduce<number[]>((acc, q, index) => {
    const answer = answers[index];
    const selected = answer?.selectedAnswer ?? null;
    const isCorrect = selected === q.correctAnswer;
    const isFlagged = answer?.isFlagged ?? false;

    switch (activeFilter) {
      case 'all':
        acc.push(index);
        break;
      case 'incorrect':
        if (selected !== null && !isCorrect) acc.push(index);
        break;
      case 'unanswered':
        if (selected === null) acc.push(index);
        break;
      case 'flagged':
        if (isFlagged) acc.push(index);
        break;
    }
    return acc;
  }, []);

  const toggleExpanded = (index: number) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
              activeFilter === f.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            )}
          >
            <span>{f.icon}</span>
            <span>{f.label}</span>
            <span className={cn(
              'px-1.5 py-0.5 rounded-full text-xs',
              activeFilter === f.id
                ? 'bg-orange-400 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
            )}>
              {f.id === 'all' && questions.length}
              {f.id === 'incorrect' && questions.filter((q, i) => {
                const a = answers[i];
                return a?.selectedAnswer !== null && a?.selectedAnswer !== undefined && a.selectedAnswer !== q.correctAnswer;
              }).length}
              {f.id === 'unanswered' && questions.filter((_, i) => {
                const a = answers[i];
                return a?.selectedAnswer === null || a?.selectedAnswer === undefined;
              }).length}
              {f.id === 'flagged' && questions.filter((_, i) => answers[i]?.isFlagged).length}
            </span>
          </button>
        ))}
      </div>

      {/* Questions list */}
      {filteredIndices.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No questions match this filter.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredIndices.map((index) => {
            const q = questions[index];
            const answer = answers[index];
            const selected = answer?.selectedAnswer ?? null;
            const isCorrect = selected === q.correctAnswer;
            const isExpanded = expandedQuestions.has(index);

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Question header (clickable) */}
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <span className={cn(
                    'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5',
                    isCorrect && 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                    !isCorrect && selected !== null && 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
                    selected === null && 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  )}>
                    {isCorrect ? '✓' : selected !== null ? '✗' : '—'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">Q{index + 1}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300">
                        {q.moduleName}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-gray-100 line-clamp-2">{q.question}</p>
                  </div>
                  <svg
                    className={cn('w-5 h-5 text-gray-400 transition-transform flex-shrink-0', isExpanded && 'rotate-180')}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700">
                    <div className="pt-4 space-y-2">
                      {optionKeys.map((key) => {
                        const isSelectedOption = selected === key;
                        const isCorrectOption = q.correctAnswer === key;
                        return (
                          <div
                            key={key}
                            className={cn(
                              'flex items-start gap-2 px-3 py-2 rounded-lg text-sm',
                              isCorrectOption && 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800',
                              isSelectedOption && !isCorrectOption && 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800',
                              !isSelectedOption && !isCorrectOption && 'text-gray-600 dark:text-gray-400'
                            )}
                          >
                            <span className={cn(
                              'font-bold flex-shrink-0',
                              isCorrectOption && 'text-green-600 dark:text-green-400',
                              isSelectedOption && !isCorrectOption && 'text-red-600 dark:text-red-400',
                            )}>
                              {key}.
                            </span>
                            <span className={cn(
                              isCorrectOption && 'text-green-800 dark:text-green-200 font-medium',
                              isSelectedOption && !isCorrectOption && 'text-red-800 dark:text-red-200 line-through',
                            )}>
                              {q.options[key]}
                            </span>
                            {isCorrectOption && (
                              <span className="text-green-600 dark:text-green-400 text-xs font-bold ml-auto flex-shrink-0">✓ Correct</span>
                            )}
                            {isSelectedOption && !isCorrectOption && (
                              <span className="text-red-600 dark:text-red-400 text-xs font-bold ml-auto flex-shrink-0">Your answer</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">Explanation</p>
                      <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
