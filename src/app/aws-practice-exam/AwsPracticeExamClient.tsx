'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/utils/cn';
import type { AwsModule, AwsExamInfo } from '@/types/aws-exam';
import { useAwsExam } from '@/hooks/useAwsExam';
import { selectFullExamQuestions, getModuleQuestions } from '@/utils/awsExamUtils';
import QuizView from '@/components/aws-exam/QuizView';
import ResultsView from '@/components/aws-exam/ResultsView';
import Button from '@/components/shared/Button';
import AdBanner from '@/components/AdBanner';

import module1 from '@/data/aws/module1.json';
import module2 from '@/data/aws/module2.json';
import module3 from '@/data/aws/module3.json';
import module4 from '@/data/aws/module4.json';
import module5 from '@/data/aws/module5.json';
import module6 from '@/data/aws/module6.json';
import module7 from '@/data/aws/module7.json';
import module8 from '@/data/aws/module8.json';
import examInfoData from '@/data/aws/examInfo.json';

const modules = [module1, module2, module3, module4, module5, module6, module7, module8] as AwsModule[];
const examInfo = examInfoData as unknown as AwsExamInfo;

const domainColors = [
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-orange-500 to-orange-600',
  'from-green-500 to-green-600',
  'from-red-500 to-red-600',
  'from-teal-500 to-teal-600',
  'from-indigo-500 to-indigo-600',
  'from-pink-500 to-pink-600',
];

export default function AwsPracticeExamClient() {
  const {
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
  } = useAwsExam();

  const totalQuestions = useMemo(() => modules.reduce((sum, m) => sum + m.questions.length, 0), []);

  const questionCountOptions = [10, 20, 30, 50];
  const [moduleQuestionCount, setModuleQuestionCount] = useState<Record<number, number | 'all'>>({});

  const getSelectedCount = (moduleId: number) => moduleQuestionCount[moduleId] ?? 'all';

  const handleStartFullExam = () => {
    const questions = selectFullExamQuestions(modules);
    startFullExam(questions);
  };

  const handleStartModulePractice = (moduleId: number) => {
    const mod = modules.find((m) => m.moduleId === moduleId);
    if (mod) {
      const allQuestions = getModuleQuestions(mod);
      const count = getSelectedCount(moduleId);
      const questions = count === 'all' ? allQuestions : allQuestions.slice(0, count);
      startModulePractice(moduleId, questions);
    }
  };

  // Quiz phase
  if (state.phase === 'quiz') {
    return (
      <div className="min-h-screen py-6 px-4">
        <div className="max-w-7xl mx-auto mb-4">
          <AdBanner position="top" />
        </div>
        <QuizView
          state={state}
          onSelectAnswer={selectAnswer}
          onToggleFlag={toggleFlag}
          onGoToQuestion={goToQuestion}
          onNextQuestion={nextQuestion}
          onPrevQuestion={prevQuestion}
          onSubmit={submitExam}
        />
      </div>
    );
  }

  // Results phase
  if (state.phase === 'results') {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto mb-4">
          <AdBanner position="top" />
        </div>
        <ResultsView state={state} onReset={reset} />
        <div className="max-w-4xl mx-auto mt-8">
          <AdBanner position="inline" />
        </div>
      </div>
    );
  }

  // Landing phase
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Ad Banner - Top */}
        <AdBanner position="top" />

        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium">
            <span>AIF-C01</span>
            <span className="w-1 h-1 rounded-full bg-orange-400" />
            <span>{examInfo.certificationLevel}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {examInfo.examName}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {examInfo.description}
          </p>
        </div>

        {/* Exam quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Questions', value: '65', sub: '50 scored + 15 unscored' },
            { label: 'Duration', value: '90 min', sub: '~1m 23s per question' },
            { label: 'Passing Score', value: '700/1000', sub: 'Scaled scoring' },
            { label: 'Practice Bank', value: `${totalQuestions}+`, sub: '8 modules' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-center shadow-sm">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Start Full Exam CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2">Full Exam Simulation</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            65 randomly selected questions from all 8 modules, proportionally weighted. 90-minute timer. Simulates real exam conditions.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleStartFullExam}
            className="bg-white text-orange-600 hover:bg-gray-50 font-bold px-8 shadow-md"
          >
            Start Full Exam
          </Button>
        </div>

        {/* Exam Domains */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Exam Domains</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {examInfo.examDomains.map((domain) => (
              <div key={domain.domainNumber} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className={cn(
                    'text-xs font-bold text-white px-2.5 py-1 rounded-full bg-gradient-to-r',
                    domainColors[domain.domainNumber - 1]
                  )}>
                    Domain {domain.domainNumber}
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {domain.weightPercentage}%
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {domain.domainName}
                </h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                  <div
                    className={cn('h-2 rounded-full bg-gradient-to-r', domainColors[domain.domainNumber - 1])}
                    style={{ width: `${domain.weightPercentage * 3.5}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ~{domain.approximateScoredQuestions} scored questions
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Banner - Inline */}
        <AdBanner position="inline" />

        {/* Module Practice */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Module Practice</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Practice one module at a time. No timer — focus on learning and understanding.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {modules.map((mod, index) => (
              <div
                key={mod.moduleId}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={cn('h-1.5 bg-gradient-to-r', domainColors[index])} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Module {mod.moduleId}
                      </span>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-0.5">
                        {mod.moduleName}
                      </h3>
                    </div>
                    <span className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {mod.questions.length} Qs
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {mod.description}
                  </p>

                  {/* Topics preview */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mod.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic.topicName}
                        className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      >
                        {topic.topicName.length > 30 ? topic.topicName.slice(0, 30) + '...' : topic.topicName}
                      </span>
                    ))}
                    {mod.topics.length > 4 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                        +{mod.topics.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Question count selector */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">Questions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {questionCountOptions
                        .filter((c) => c <= mod.questions.length)
                        .map((count) => (
                          <button
                            key={count}
                            onClick={() => setModuleQuestionCount((prev) => ({ ...prev, [mod.moduleId]: count }))}
                            className={cn(
                              'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                              getSelectedCount(mod.moduleId) === count
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            )}
                          >
                            {count}
                          </button>
                        ))}
                      <button
                        onClick={() => setModuleQuestionCount((prev) => ({ ...prev, [mod.moduleId]: 'all' }))}
                        className={cn(
                          'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                          getSelectedCount(mod.moduleId) === 'all'
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        )}
                      >
                        All ({mod.questions.length})
                      </button>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => handleStartModulePractice(mod.moduleId)}
                  >
                    Practice {getSelectedCount(mod.moduleId) === 'all' ? `All ${mod.questions.length}` : getSelectedCount(mod.moduleId)} Questions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Tips */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Exam Day Tips</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {examInfo.examDayTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Banner - Bottom */}
        <AdBanner position="inline" />

      </div>
    </div>
  );
}
