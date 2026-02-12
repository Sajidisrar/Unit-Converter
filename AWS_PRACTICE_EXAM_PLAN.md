# AWS AI Practitioner Practice Exam - Implementation Plan

## Project Overview
A practice exam page for the **AWS Certified AI Practitioner (AIF-C01)** certification, integrated into the existing Unit Converter / Free Online Tools Next.js application.

## Status: CORE IMPLEMENTATION COMPLETE

### Completed
- [x] **Types** — `src/types/aws-exam.ts` — All TypeScript interfaces (QuizState, QuizAction, ScoreResult, ModuleBreakdown, etc.)
- [x] **Data** — `src/data/aws/module1-8.json` + `examInfo.json` — 800+ questions across 8 modules + exam metadata
- [x] **Utilities** — `src/utils/awsExamUtils.ts` — Shuffle, proportional question selection (65 Qs), scoring with scaled score, module breakdown, timer formatting
- [x] **Hook** — `src/hooks/useAwsExam.ts` — Full useReducer state machine (landing/quiz/results phases, timer, flag, navigation, submit, reset)
- [x] **Components** (6 files in `src/components/aws-exam/`):
  - `QuestionCard.tsx` — Question display with A/B/C/D option selection + flag toggle
  - `QuizNavigation.tsx` — Question grid navigator (answered/flagged/current indicators + legend)
  - `QuizView.tsx` — Main quiz layout (sticky top bar, prev/next, mobile nav drawer, submit confirmation modal)
  - `QuizTimer.tsx` — Countdown timer with warning (<=10min) and danger (<=5min) color states
  - `ResultsView.tsx` — Pass/fail banner, scaled score, stats grid, module breakdown progress bars
  - `QuestionReview.tsx` — Post-exam review with filter tabs (all/incorrect/unanswered/flagged) + expandable explanations
- [x] **Page Route** — `src/app/aws-practice-exam/page.tsx` — Server component with SEO metadata + JSON-LD
- [x] **Landing Page** — `src/app/aws-practice-exam/AwsPracticeExamClient.tsx` — Hero, exam stats, full exam CTA, domain breakdown, module practice cards, exam day tips
- [x] **Tool Registration** — Added to `src/constants/tools.ts` under new "learning" category
- [x] **Category Type** — Updated `src/types/conversions.ts` to include `'learning'` in ToolConfig category union
- [x] **Lint Fix** — Removed unused `QuizAnswer` import from `awsExamUtils.ts`
- [x] **All checks pass** — `npm run check-all` (type-check + lint:check) passes clean

### Not Yet Done (Future Enhancements)
- [ ] **Commit all changes** — Everything is uncommitted on `develop` branch
- [ ] **Build test** — Run `npm run build` to verify production build
- [ ] **Local storage persistence** — Save quiz progress so refreshing doesn't lose data
- [ ] **Score history** — Track past attempts and show improvement over time
- [ ] **Study mode** — Show correct answers immediately after each question (instant feedback)
- [ ] **Keyboard shortcuts** — Arrow keys for navigation, number keys for answers
- [ ] **Dark mode testing** — Verify all components look correct in dark mode
- [ ] **Mobile responsiveness** — Test on various screen sizes
- [ ] **Question randomization seed** — Allow retaking the exact same exam for comparison

## Architecture

### Data Flow
```
JSON modules (src/data/aws/)
  → awsExamUtils.ts (select/shuffle questions)
  → useAwsExam.ts hook (useReducer state machine)
  → AwsPracticeExamClient.tsx (phase routing)
    → Landing: exam info + module cards
    → Quiz: QuizView → QuestionCard + QuizNavigation + QuizTimer
    → Results: ResultsView → QuestionReview
```

### Quiz Modes
1. **Full Exam** — 65 questions proportionally from all 8 modules, 90-minute timer, scaled scoring (100-1000, pass at 700)
2. **Module Practice** — All questions from one module, no timer, still shows score at end

### Question Distribution (Full Exam)
- Modules 1-6 (100 Qs each): 9 questions each = 54
- Module 7 (80 Qs): 6 questions = 6
- Module 8 (80 Qs): 5 questions = 5
- **Total = 65**

### Scoring
- Raw percentage mapped to 100-1000 scaled score
- Passing score: 700 (matches real AWS exam)
- Module breakdown with color-coded progress bars (>=70% green, >=50% amber, <50% red)

## File Structure
```
src/
├── app/aws-practice-exam/
│   ├── page.tsx                    # Server component (metadata + JSON-LD)
│   └── AwsPracticeExamClient.tsx   # Client component (landing/quiz/results)
├── components/aws-exam/
│   ├── QuestionCard.tsx
│   ├── QuizNavigation.tsx
│   ├── QuizView.tsx
│   ├── QuizTimer.tsx
│   ├── ResultsView.tsx
│   └── QuestionReview.tsx
├── data/aws/
│   ├── module1.json through module8.json
│   └── examInfo.json
├── hooks/useAwsExam.ts
├── types/aws-exam.ts
└── utils/awsExamUtils.ts
```

## Key Files Modified (from pre-existing codebase)
- `src/constants/tools.ts` — Added AWS exam tool + "learning" category
- `src/types/conversions.ts` — Added `'learning'` to ToolConfig category union
