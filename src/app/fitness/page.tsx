import React from "react";
import type { Metadata } from "next";
import { heightUnits } from "@/utils/conversions";
import Calculator from "@/components/Calculator";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Fitness Converter - Height, Weight & BMI Calculator",
  description:
    "Easily convert between fitness-related units including height and weight, and calculate your BMI. Perfect for tracking your health and fitness goals.",
  keywords: [
    "fitness converter",
    "height converter",
    "weight converter",
    "BMI calculator",
    "body mass index",
    "health",
    "fitness",
    "unit converter",
  ],
  alternates: {
    canonical: 'https://freeunitconvertor.com/fitness',
  },
  openGraph: {
    title: "Fitness Converter - Height, Weight & BMI Calculator",
    description:
      "Convert fitness units and calculate BMI easily. Includes height, weight, and body mass index tools.",
    url: "https://yourdomain.com/fitness",
    siteName: "Unit Converter",
    locale: "en_US",
    type: "website",
  },
};

const faqs = [
  {
    question: "What is BMI and why is it important?",
    answer:
      "BMI (Body Mass Index) is a measure that uses your height and weight to estimate if you have a healthy body weight. It&apos;s widely used to assess health risks related to underweight and overweight.",
  },
  {
    question: "How do I convert my weight between kilograms and pounds?",
    answer:
      "You can use the Weight Converter above to easily switch between kilograms (kg), pounds (lb), and other units.",
  },
  {
    question: "How do I convert my height between centimeters, meters, and feet/inches?",
    answer:
      "Use the Height Converter to convert between centimeters, meters, feet, and inches seamlessly.",
  },
  {
    question: "What is a healthy BMI range?",
    answer:
      "A healthy BMI typically ranges from 18.5 to 24.9. Values below or above this range may indicate underweight or overweight, respectively.",
  },
  {
    question: "Can BMI be inaccurate?",
    answer:
      "BMI is a general guideline and does not account for muscle mass, bone density, or overall body composition. For athletes or muscular individuals, BMI may not accurately reflect health status.",
  },
];

export default function FitnessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Left side ad/empty */}
          <div className="hidden md:block"><AdBanner position="side" /></div>
          {/* Center content */}
          <div className="col-span-1 md:col-span-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Fitness Converter - Height, Weight &amp; BMI Calculator
            </h1>

            {/* BMI Calculator */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">BMI Calculator</h2>
              <Calculator title="BMI Calculator" units={[]} conversionType="bmi" />
            </section>

            {/* Height Converter */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Height Converter</h2>
              <Calculator title="Height Converter" units={heightUnits} conversionType="height" />
            </section>

            <AdBanner position="inline" />

            {/* SEO Content Section */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Fitness Conversion Insights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Track height and weight with conversions that support nutrition and training. Explore the <a href="/weight" className="text-indigo-600 dark:text-indigo-400 hover:underline">Unit converter weight</a> for mass, and use the <a href="/temperature" className="text-indigo-600 dark:text-indigo-400 hover:underline">Temperature Converter</a> for exercise environment planning.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Health data platforms often transform records via <a href="/developer" className="text-indigo-600 dark:text-indigo-400 hover:underline">json to csv</a> and encode attachments using <a href="/developer" className="text-indigo-600 dark:text-indigo-400 hover:underline">base64 encoding</a>, which are core tasks across <b>AI artificial Intelligence</b> and <b>Data Science</b>.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Fitness Converter FAQ</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx}>
                      <button
                        type="button"
                        className="text-left w-full font-semibold text-gray-900 dark:text-white focus:outline-none"
                        aria-expanded="false"
                        tabIndex={0}
                      >
                        {faq.question}
                      </button>
                      <div className="ml-2 mt-1 text-gray-600 dark:text-gray-300">{faq.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}