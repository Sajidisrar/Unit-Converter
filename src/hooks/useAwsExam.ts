'use client';

import { useReducer, useEffect, useCallback, useRef } from 'react';
import type { QuizState, QuizAction, QuizQuestion } from '@/types/aws-exam';

const FULL_EXAM_TIME_SECONDS = 90 * 60; // 90 minutes
const SECONDS_PER_QUESTION = 90; // 1.5 minutes per question for module practice

const initialState: QuizState = {
  phase: 'landing',
  mode: 'full-exam',
  selectedModuleId: null,
  questions: [],
  answers: {},
  currentQuestionIndex: 0,
  timeRemainingSeconds: null,
  isTimerRunning: false,
  startedAt: null,
  completedAt: null,
};

function buildInitialAnswers(count: number): Record<number, { questionIndex: number; selectedAnswer: string | null; isFlagged: boolean }> {
  const answers: Record<number, { questionIndex: number; selectedAnswer: string | null; isFlagged: boolean }> = {};
  for (let i = 0; i < count; i++) {
    answers[i] = { questionIndex: i, selectedAnswer: null, isFlagged: false };
  }
  return answers;
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_FULL_EXAM':
      return {
        ...state,
        phase: 'quiz',
        mode: 'full-exam',
        selectedModuleId: null,
        questions: action.questions,
        answers: buildInitialAnswers(action.questions.length),
        currentQuestionIndex: 0,
        timeRemainingSeconds: FULL_EXAM_TIME_SECONDS,
        isTimerRunning: true,
        startedAt: Date.now(),
        completedAt: null,
      };

    case 'START_MODULE_PRACTICE':
      return {
        ...state,
        phase: 'quiz',
        mode: 'module-practice',
        selectedModuleId: action.moduleId,
        questions: action.questions,
        answers: buildInitialAnswers(action.questions.length),
        currentQuestionIndex: 0,
        timeRemainingSeconds: action.questions.length * SECONDS_PER_QUESTION,
        isTimerRunning: true,
        startedAt: Date.now(),
        completedAt: null,
      };

    case 'SELECT_ANSWER': {
      const existing = state.answers[action.questionIndex];
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionIndex]: {
            ...existing,
            questionIndex: action.questionIndex,
            selectedAnswer: action.answer,
            isFlagged: existing?.isFlagged ?? false,
          },
        },
      };
    }

    case 'TOGGLE_FLAG': {
      const existing = state.answers[action.questionIndex];
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionIndex]: {
            ...existing,
            questionIndex: action.questionIndex,
            isFlagged: !(existing?.isFlagged ?? false),
          },
        },
      };
    }

    case 'GO_TO_QUESTION':
      if (action.index >= 0 && action.index < state.questions.length) {
        return { ...state, currentQuestionIndex: action.index };
      }
      return state;

    case 'NEXT_QUESTION':
      if (state.currentQuestionIndex < state.questions.length - 1) {
        return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
      return state;

    case 'PREV_QUESTION':
      if (state.currentQuestionIndex > 0) {
        return { ...state, currentQuestionIndex: state.currentQuestionIndex - 1 };
      }
      return state;

    case 'TICK_TIMER': {
      if (state.timeRemainingSeconds === null) return state;
      const next = state.timeRemainingSeconds - 1;
      if (next <= 0) {
        return {
          ...state,
          timeRemainingSeconds: 0,
          isTimerRunning: false,
          phase: 'results',
          completedAt: Date.now(),
        };
      }
      return { ...state, timeRemainingSeconds: next };
    }

    case 'SUBMIT_EXAM':
      return {
        ...state,
        phase: 'results',
        isTimerRunning: false,
        completedAt: Date.now(),
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function useAwsExam() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer effect
  useEffect(() => {
    if (state.isTimerRunning && state.timeRemainingSeconds !== null && state.timeRemainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state.isTimerRunning, state.timeRemainingSeconds]);

  // Warn before leaving during active quiz
  useEffect(() => {
    if (state.phase === 'quiz') {
      const handler = (e: BeforeUnloadEvent) => {
        e.preventDefault();
      };
      window.addEventListener('beforeunload', handler);
      return () => window.removeEventListener('beforeunload', handler);
    }
  }, [state.phase]);

  const startFullExam = useCallback((questions: QuizQuestion[]) => {
    dispatch({ type: 'START_FULL_EXAM', questions });
  }, []);

  const startModulePractice = useCallback((moduleId: number, questions: QuizQuestion[]) => {
    dispatch({ type: 'START_MODULE_PRACTICE', moduleId, questions });
  }, []);

  const selectAnswer = useCallback((questionIndex: number, answer: string) => {
    dispatch({ type: 'SELECT_ANSWER', questionIndex, answer });
  }, []);

  const toggleFlag = useCallback((questionIndex: number) => {
    dispatch({ type: 'TOGGLE_FLAG', questionIndex });
  }, []);

  const goToQuestion = useCallback((index: number) => {
    dispatch({ type: 'GO_TO_QUESTION', index });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const prevQuestion = useCallback(() => {
    dispatch({ type: 'PREV_QUESTION' });
  }, []);

  const submitExam = useCallback(() => {
    dispatch({ type: 'SUBMIT_EXAM' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    startFullExam,
    startModulePractice,
    selectAnswer,
    toggleFlag,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitExam,
    reset,
  };
}
