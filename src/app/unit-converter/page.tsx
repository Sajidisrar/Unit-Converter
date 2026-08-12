import { Metadata } from 'next';
import UnitConverterClient from './UnitConverterClient';

export const metadata: Metadata = {
  title: 'Unit Converter - Length, Weight, Temperature, Area, Speed | Free Online Tool',
  description: 'Free online unit converter. Convert length (meters, feet), weight (kg, lbs), temperature (C, F, K), area (sq m, acres), and speed (km/h, mph) instantly. Accurate, fast, and privacy-focused.',
  keywords: [
    'unit converter', 'measurement converter', 'online converter',
    'length converter', 'meters to feet', 'inches to cm',
    'weight converter', 'kg to lbs', 'pounds to kg',
    'temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius',
    'area converter', 'square meters to feet', 'acres to hectares',
    'speed converter', 'mph to km/h', 'knots to mph',
    'metric converter', 'imperial converter'
  ],
  openGraph: {
    title: 'Unit Converter - Convert Length, Weight, Temperature, Area, Speed',
    description: 'Free online unit converter for length, weight, temperature, area, and speed. Instant, accurate conversions between metric and imperial units.',
    type: 'website',
    url: 'https://freeunitconvertor.com/unit-converter',
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/unit-converter',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Unit Converter',
  description: 'Free online unit converter for length, weight, temperature, area, and speed measurements.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Length conversion (meters, feet, inches, miles)',
    'Weight conversion (kg, lbs, oz, grams)',
    'Temperature conversion (Celsius, Fahrenheit, Kelvin)',
    'Area conversion (sq meters, sq feet, acres, hectares)',
    'Speed conversion (km/h, mph, knots, mach)',
    'Instant browser-based calculations',
    'High precision results'
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert meters to feet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To convert meters to feet, multiply the number of meters by 3.28084. For example, 5 meters = 5 × 3.28084 = 16.404 feet. Our converter does this instantly - enter the value, select meters and feet, and get the result.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the formula to convert Celsius to Fahrenheit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To convert Celsius to Fahrenheit, multiply by 9/5 and add 32. The formula is: °F = (°C × 9/5) + 32. For example, 25°C = (25 × 9/5) + 32 = 77°F. To convert back: °C = (°F - 32) × 5/9.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many pounds are in a kilogram?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One kilogram equals approximately 2.205 pounds (lbs). To convert kg to lbs, multiply the weight in kilograms by 2.205. Conversely, to convert pounds to kg, divide by 2.205 or multiply by 0.4536.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between metric and imperial units?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Metric system (SI) uses base-10 units like meters, grams, and liters, used worldwide. Imperial system uses feet, pounds, and gallons, primarily in the US. Metric is easier for calculations due to decimal-based conversions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert miles per hour to kilometers per hour?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To convert mph to km/h, multiply by 1.60934. For example, 60 mph = 60 × 1.60934 = 96.56 km/h. To convert km/h to mph, divide by 1.60934 or multiply by 0.621371.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many square feet are in an acre?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One acre equals exactly 43,560 square feet. An acre is also equal to 4,047 square meters or 0.4047 hectares. One square mile contains 640 acres.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is absolute zero in Celsius and Fahrenheit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolute zero, the coldest possible temperature, is -273.15°C or -459.67°F (0 Kelvin). At this temperature, all molecular motion stops. Water freezes at 0°C (32°F) and boils at 100°C (212°F) at standard pressure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert inches to centimeters?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To convert inches to centimeters, multiply by 2.54. For example, 10 inches = 10 × 2.54 = 25.4 cm. This is an exact conversion factor. To convert cm to inches, divide by 2.54.',
      },
    },
  ],
};

export default function UnitConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <UnitConverterClient />
    </>
  );
}
