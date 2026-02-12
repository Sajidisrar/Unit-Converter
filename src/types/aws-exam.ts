// AWS Exam data types (matching JSON structure)

export interface AwsQuestionOptions {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface AwsQuestion {
  id: number;
  question: string;
  options: AwsQuestionOptions;
  correctAnswer: string;
  explanation: string;
}

export interface AwsTopic {
  topicName: string;
  definition: string;
}

export interface AwsModule {
  moduleId: number;
  moduleName: string;
  description: string;
  topics: AwsTopic[];
  questions: AwsQuestion[];
}

export interface AwsExamDomain {
  domainNumber: number;
  domainName: string;
  weightPercentage: number;
  approximateScoredQuestions: number;
  taskStatements: string[];
  keyTopics: string[];
  mappedModules: string[];
}

export interface AwsExamInfo {
  examName: string;
  examCode: string;
  certificationLevel: string;
  description: string;
  examDetails: {
    totalQuestions: number;
    scoredQuestions: number;
    unscoredQuestions: number;
    duration: string;
    examCost: string;
    prerequisites: string;
    validityPeriod: string;
  };
  scoringDetails: {
    scoreRange: { minimum: number; maximum: number };
    passingScore: number;
    scoringModel: string;
    scoringModelExplanation: string;
  };
  examDomains: AwsExamDomain[];
  examStrategy: {
    timeManagement: {
      totalTime: string;
      timePerQuestion: string;
      strategy: string[];
    };
    answerTechniques: Array<{
      technique: string;
      description: string;
    }>;
    commonTrapTopics: Array<{
      trap: string;
      tip: string;
    }>;
    lastMinuteChecklist: string[];
  };
  examDayTips: string[];
}

// Quiz state types

export type QuizMode = 'full-exam' | 'module-practice';
export type QuizPhase = 'landing' | 'quiz' | 'results';

export interface QuizQuestion extends AwsQuestion {
  moduleId: number;
  moduleName: string;
}

export interface QuizAnswer {
  questionIndex: number;
  selectedAnswer: string | null;
  isFlagged: boolean;
}

export interface QuizState {
  phase: QuizPhase;
  mode: QuizMode;
  selectedModuleId: number | null;
  questions: QuizQuestion[];
  answers: Record<number, QuizAnswer>;
  currentQuestionIndex: number;
  timeRemainingSeconds: number | null;
  isTimerRunning: boolean;
  startedAt: number | null;
  completedAt: number | null;
}

export type QuizAction =
  | { type: 'START_FULL_EXAM'; questions: QuizQuestion[] }
  | { type: 'START_MODULE_PRACTICE'; moduleId: number; questions: QuizQuestion[] }
  | { type: 'SELECT_ANSWER'; questionIndex: number; answer: string }
  | { type: 'TOGGLE_FLAG'; questionIndex: number }
  | { type: 'GO_TO_QUESTION'; index: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'TICK_TIMER' }
  | { type: 'SUBMIT_EXAM' }
  | { type: 'RESET' };

export interface ScoreResult {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  percentageCorrect: number;
  scaledScore: number;
  passed: boolean;
}

export interface ModuleBreakdown {
  moduleId: number;
  moduleName: string;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
}
