import React from "react";
import type { Metadata } from "next";
import { heightUnits } from "@/utils/conversions";
import FitnessPageClient from "@/components/FitnessPageClient";

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
    url: "https://freeunitconvertor.com/fitness",
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
  const seoContent = (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Fitness Conversion Insights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Track height and weight with conversions that support nutrition and training. Explore the <a href="/unit-converter" className="text-indigo-600 dark:text-indigo-400 hover:underline">Unit Converter</a> for mass and temperature conversions.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Use our <a href="/unit-converter" className="text-indigo-600 dark:text-indigo-400 hover:underline">unit converter</a> for additional weight and length conversions, or the <a href="/cooking" className="text-indigo-600 dark:text-indigo-400 hover:underline">cooking converter</a> for nutrition-related measurements.
              </p>
            </section>
  );

  const faqContent = (
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
  );

  return <FitnessPageClient heightUnits={heightUnits} seoContent={seoContent} faqContent={faqContent} />;
}