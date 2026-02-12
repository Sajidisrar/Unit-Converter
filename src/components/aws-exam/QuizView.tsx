'use client';

import { useState } from 'react';
import { cn } from '@/utils/cn';
import type { QuizState } from '@/types/aws-exam';
import QuestionCard from './QuestionCard';
import QuizNavigation from './QuizNavigation';
import QuizTimer from './QuizTimer';
import Button from '@/components/shared/Button';

interface QuizViewProps {
  state: QuizState;
  onSelectAnswer: (questionIndex: number, answer: string) => void;
  onToggleFlag: (questionIndex: number) => void;
  onGoToQuestion: (index: number) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onSubmit: () => void;
}

export default function QuizView({
  state,
  onSelectAnswer,
  onToggleFlag,
  onGoToQuestion,
  onNextQuestion,
  onPrevQuestion,
  onSubmit,
}: QuizViewProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const currentAnswer = state.answers[state.currentQuestionIndex];
  const answeredCount = Object.values(state.answers).filter((a) => a.selectedAnswer !== null).length;
  const flaggedCount = Object.values(state.answers).filter((a) => a.isFlagged).length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 rounded-t-xl shadow-sm mb-4">
        <div className="flex items-center justify-between px-4 py-3 gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {state.mode === 'full-exam' ? 'Full Exam' : 'Module Practice'}
            </h2>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
              {answeredCount}/{state.questions.length} answered
            </span>
            {flaggedCount > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300">
                {flaggedCount} flagged
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Show Answer toggle */}
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                showAnswer
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
              title={showAnswer ? 'Hide instant feedback' : 'Show instant feedback'}
            >
              <div className={cn(
                'relative w-8 h-4 rounded-full transition-colors',
                showAnswer ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              )}>
                <div className={cn(
                  'absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform',
                  showAnswer ? 'translate-x-4' : 'translate-x-0.5'
                )} />
              </div>
              <span className="hidden sm:inline">Show Answers</span>
            </button>

            {state.timeRemainingSeconds !== null && (
              <QuizTimer timeRemainingSeconds={state.timeRemainingSeconds} />
            )}

            {/* Mobile nav toggle */}
            <button
              onClick={() => setShowNav(!showNav)}
              className="lg:hidden px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium"
            >
              Navigator
            </button>

            <Button
              variant="error"
              size="sm"
              onClick={() => setShowConfirm(true)}
            >
              Submit Exam
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-6">
        {/* Question area */}
        <div className="flex-1 min-w-0">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              answer={currentAnswer}
              questionNumber={state.currentQuestionIndex + 1}
              totalQuestions={state.questions.length}
              showAnswer={showAnswer}
              onSelectAnswer={(answer) => onSelectAnswer(state.currentQuestionIndex, answer)}
              onToggleFlag={() => onToggleFlag(state.currentQuestionIndex)}
            />
          )}

          {/* Prev/Next buttons */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevQuestion}
              disabled={state.currentQuestionIndex === 0}
              leftIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
            >
              Previous
            </Button>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {state.currentQuestionIndex + 1} / {state.questions.length}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={onNextQuestion}
              disabled={state.currentQuestionIndex === state.questions.length - 1}
              rightIcon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              Next
            </Button>
          </div>
        </div>

        {/* Desktop sidebar navigation */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-24">
            <QuizNavigation
              totalQuestions={state.questions.length}
              answers={state.answers}
              currentIndex={state.currentQuestionIndex}
              onGoToQuestion={onGoToQuestion}
            />
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {showNav && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setShowNav(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-800 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Navigator</h3>
              <button onClick={() => setShowNav(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <QuizNavigation
              totalQuestions={state.questions.length}
              answers={state.answers}
              currentIndex={state.currentQuestionIndex}
              onGoToQuestion={(i) => { onGoToQuestion(i); setShowNav(false); }}
            />
          </div>
        </div>
      )}

      {/* Submit confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Submit Exam?</h3>
            <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
              <p>You have answered <strong className="text-gray-900 dark:text-white">{answeredCount}</strong> of <strong className="text-gray-900 dark:text-white">{state.questions.length}</strong> questions.</p>
              {state.questions.length - answeredCount > 0 && (
                <p className="text-amber-600 dark:text-amber-400">
                  {state.questions.length - answeredCount} question(s) are still unanswered.
                </p>
              )}
              {flaggedCount > 0 && (
                <p className="text-amber-600 dark:text-amber-400">
                  {flaggedCount} question(s) are flagged for review.
                </p>
              )}
              <p className={cn('font-medium', state.questions.length - answeredCount > 0 ? 'text-red-600 dark:text-red-400' : '')}>
                Are you sure you want to submit?
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowConfirm(false)}
              >
                Continue Quiz
              </Button>
              <Button
                variant="error"
                fullWidth
                onClick={() => { setShowConfirm(false); onSubmit(); }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
