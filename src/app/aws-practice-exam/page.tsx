import { Metadata } from 'next';
import AwsPracticeExamClient from './AwsPracticeExamClient';

export const metadata: Metadata = {
  title: 'AWS AI Practitioner Practice Exam 2025 | AIF-C01 Free Practice Test (800+ Questions)',
  description: 'Free AWS Certified AI Practitioner (AIF-C01) practice exam with 800+ questions across 8 modules. Simulates real exam conditions with 65 questions, 90-minute timer, scaled scoring, instant answer feedback, and detailed explanations. Pass your AWS AI certification on the first attempt.',
  keywords: 'AWS AI Practitioner exam, AIF-C01 practice test, AWS certification practice, AI practitioner questions, AWS AI exam prep, free AWS practice exam, AWS machine learning certification, AWS Bedrock exam, AWS AI practitioner 2025, AIF-C01 free questions, AWS AI mock exam, AWS certified AI practitioner study guide, AWS AI practitioner sample questions, AWS cloud AI certification, Amazon AI practitioner test, AWS exam simulator, AWS AI practitioner dumps, generative AI certification AWS',
  robots: 'index, follow',
  openGraph: {
    title: 'AWS AI Practitioner Practice Exam 2025 | AIF-C01 Free (800+ Questions)',
    description: 'Free practice exam for AWS Certified AI Practitioner with 800+ questions, timed exam simulation, instant feedback, and detailed explanations. Module-wise practice and full exam mode.',
    type: 'website',
    url: 'https://freeunitconvertor.com/aws-practice-exam',
    siteName: 'Free Unit Converter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AWS AI Practitioner Practice Exam | AIF-C01 Free Practice Test',
    description: 'Free AWS AIF-C01 practice exam with 800+ questions, timed simulation, instant feedback, and detailed explanations.',
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/aws-practice-exam',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many questions are on the AWS AI Practitioner exam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The AWS Certified AI Practitioner (AIF-C01) exam has 65 questions total — 50 scored and 15 unscored pretest questions. You get 90 minutes to complete the exam. The passing score is 700 out of 1000.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this AWS AI Practitioner practice exam free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, this practice exam is completely free with 800+ questions across 8 modules. It includes full exam simulation with a 90-minute timer, module-wise practice, instant answer feedback, detailed explanations, and scaled scoring matching the real AWS exam.',
          },
        },
        {
          '@type': 'Question',
          name: 'What topics does the AWS AI Practitioner exam cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The exam covers 5 domains: Fundamentals of AI and ML (20%), Fundamentals of Generative AI (24%), Applications of Foundation Models (28%), Guidelines for Responsible AI (14%), and Security, Compliance, and Governance (14%). Key topics include Amazon Bedrock, SageMaker, prompt engineering, RAG, fine-tuning, and AWS AI services.',
          },
        },
        {
          '@type': 'Question',
          name: 'What score do I need to pass the AWS AI Practitioner exam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You need a minimum scaled score of 700 out of 1000 to pass. AWS uses compensatory scoring, meaning you do not need to pass each domain individually — a strong performance in one domain can compensate for a weaker performance in another.',
          },
        },
      ],
    }),
  },
};

const examJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AWS AI Practitioner Practice Exam',
  description: 'Free practice exam for AWS Certified AI Practitioner (AIF-C01) with 800+ questions across 8 modules',
  url: 'https://freeunitconvertor.com/aws-practice-exam',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Full exam simulation (65 questions, 90-minute timer)',
    'Module-wise practice mode',
    '800+ practice questions',
    'Detailed explanations for every question',
    'Scaled scoring matching real AWS exam',
    'Module performance breakdown',
    'Question flagging and review',
  ],
};

export default function AwsPracticeExamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(examJsonLd) }}
      />
      <AwsPracticeExamClient />
    </>
  );
}
