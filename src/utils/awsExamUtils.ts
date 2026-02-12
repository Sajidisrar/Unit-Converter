import type {
  AwsModule,
  QuizQuestion,
  QuizState,
  ScoreResult,
  ModuleBreakdown,
} from '@/types/aws-exam';

/**
 * Fisher-Yates shuffle - returns a new shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Select 65 random questions proportionally from all 8 modules.
 * Modules 1-6 (100 Qs each): 9 questions each = 54
 * Module 7 (80 Qs): 6 questions = 6
 * Module 8 (80 Qs): 5 questions = 5
 * Total = 65
 */
export function selectFullExamQuestions(modules: AwsModule[]): QuizQuestion[] {
  const questionsPerModule: Record<number, number> = {
    1: 9, 2: 9, 3: 9, 4: 9, 5: 9, 6: 9, 7: 6, 8: 5,
  };

  const selected: QuizQuestion[] = [];

  for (const mod of modules) {
    const count = questionsPerModule[mod.moduleId] || 8;
    const shuffled = shuffleArray(mod.questions);
    const picked = shuffled.slice(0, count);
    for (const q of picked) {
      selected.push({
        ...q,
        moduleId: mod.moduleId,
        moduleName: mod.moduleName,
      });
    }
  }

  return shuffleArray(selected);
}

/**
 * Get all questions from a specific module, shuffled.
 */
export function getModuleQuestions(module: AwsModule): QuizQuestion[] {
  const questions: QuizQuestion[] = module.questions.map((q) => ({
    ...q,
    moduleId: module.moduleId,
    moduleName: module.moduleName,
  }));
  return shuffleArray(questions);
}

/**
 * Calculate exam score from quiz state.
 */
export function calculateScore(state: QuizState): ScoreResult {
  const { questions, answers } = state;
  const totalQuestions = questions.length;
  let answeredCount = 0;
  let correctCount = 0;

  for (let i = 0; i < totalQuestions; i++) {
    const answer = answers[i];
    if (answer && answer.selectedAnswer !== null) {
      answeredCount++;
      if (answer.selectedAnswer === questions[i].correctAnswer) {
        correctCount++;
      }
    }
  }

  const incorrectCount = answeredCount - correctCount;
  const unansweredCount = totalQuestions - answeredCount;
  const percentageCorrect = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  // Scaled score: map 0-100% to 100-1000
  const scaledScore = Math.round(100 + (percentageCorrect / 100) * 900);
  const passed = scaledScore >= 700;

  return {
    totalQuestions,
    answeredCount,
    correctCount,
    incorrectCount,
    unansweredCount,
    percentageCorrect: Math.round(percentageCorrect * 10) / 10,
    scaledScore,
    passed,
  };
}

/**
 * Break down results by module.
 */
export function getModuleBreakdown(state: QuizState): ModuleBreakdown[] {
  const { questions, answers } = state;
  const moduleMap = new Map<number, { moduleName: string; total: number; correct: number }>();

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (!moduleMap.has(q.moduleId)) {
      moduleMap.set(q.moduleId, { moduleName: q.moduleName, total: 0, correct: 0 });
    }
    const entry = moduleMap.get(q.moduleId)!;
    entry.total++;

    const answer = answers[i];
    if (answer && answer.selectedAnswer === q.correctAnswer) {
      entry.correct++;
    }
  }

  return Array.from(moduleMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([moduleId, data]) => ({
      moduleId,
      moduleName: data.moduleName,
      totalQuestions: data.total,
      correctCount: data.correct,
      percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    }));
}

/**
 * Format seconds into MM:SS display string.
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
