'use client';

import { cn } from '@/utils/cn';
import type { QuizQuestion, QuizAnswer } from '@/types/aws-exam';

interface QuestionCardProps {
  question: QuizQuestion;
  answer: QuizAnswer | undefined;
  questionNumber: number;
  totalQuestions: number;
  showAnswer?: boolean;
  onSelectAnswer: (answer: string) => void;
  onToggleFlag: () => void;
}

const optionKeys = ['A', 'B', 'C', 'D'] as const;

export default function QuestionCard({
  question,
  answer,
  questionNumber,
  totalQuestions,
  showAnswer = false,
  onSelectAnswer,
  onToggleFlag,
}: QuestionCardProps) {
  const selectedAnswer = answer?.selectedAnswer ?? null;
  const isFlagged = answer?.isFlagged ?? false;
  const hasAnswered = selectedAnswer !== null;
  const isCorrect = hasAnswered && selectedAnswer === question.correctAnswer;
  const revealAnswer = showAnswer && hasAnswered;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium">
            {question.moduleName}
          </span>
          {revealAnswer && (
            <span className={cn(
              'text-xs px-2 py-1 rounded-full font-semibold',
              isCorrect
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            )}>
              {isCorrect ? 'Correct' : 'Incorrect'}
            </span>
          )}
        </div>
        <button
          onClick={onToggleFlag}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
            isFlagged
              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          )}
          title={isFlagged ? 'Remove flag' : 'Flag for review'}
        >
          <svg className="w-4 h-4" fill={isFlagged ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          {isFlagged ? 'Flagged' : 'Flag'}
        </button>
      </div>

      {/* Question text */}
      <div className="px-6 py-5">
        <p className="text-lg font-semibold leading-relaxed text-gray-900 dark:text-gray-100">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="px-6 pb-6 space-y-3">
        {optionKeys.map((key) => {
          const isSelected = selectedAnswer === key;
          const isCorrectOption = question.correctAnswer === key;
          const showCorrectHighlight = revealAnswer && isCorrectOption;
          const showIncorrectHighlight = revealAnswer && isSelected && !isCorrectOption;

          return (
            <button
              key={key}
              onClick={() => onSelectAnswer(key)}
              className={cn(
                'w-full text-left px-5 py-4 rounded-lg border-2 transition-all duration-200',
                'flex items-start gap-3',
                showCorrectHighlight
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400'
                  : showIncorrectHighlight
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-750'
              )}
            >
              <span
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                  showCorrectHighlight
                    ? 'bg-green-500 text-white'
                    : showIncorrectHighlight
                    ? 'bg-red-500 text-white'
                    : isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                )}
              >
                {showCorrectHighlight ? '✓' : showIncorrectHighlight ? '✗' : key}
              </span>
              <span className={cn(
                'text-base font-medium leading-relaxed pt-1',
                showCorrectHighlight
                  ? 'text-green-800 dark:text-green-200 font-semibold'
                  : showIncorrectHighlight
                  ? 'text-red-800 dark:text-red-200 line-through font-semibold'
                  : isSelected
                  ? 'text-blue-900 dark:text-blue-100 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
              )}>
                {question.options[key]}
              </span>
              {showCorrectHighlight && (
                <span className="ml-auto text-xs font-bold text-green-600 dark:text-green-400 flex-shrink-0 pt-1.5">Correct</span>
              )}
              {showIncorrectHighlight && (
                <span className="ml-auto text-xs font-bold text-red-600 dark:text-red-400 flex-shrink-0 pt-1.5">Your answer</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation (shown when showAnswer is on and user has answered) */}
      {revealAnswer && (
        <div className="px-6 pb-6">
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">Explanation</p>
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
