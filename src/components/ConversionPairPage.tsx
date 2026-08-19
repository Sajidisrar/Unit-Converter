import AdBanner from '@/components/AdBanner';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqSection, { FaqEntry } from '@/components/shared/FaqSection';
import RelatedTools from '@/components/shared/RelatedTools';
import { ConversionType } from '@/types/conversions';
import { convertByType } from '@/utils/conversions';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface ConversionPairPageProps {
  /** e.g. "Metres to Feet" */
  title: string;
  subtitle: string;
  conversionType: ConversionType;
  fromUnit: string;
  toUnit: string;
  /** Display labels, e.g. "metres" / "feet" */
  fromLabel: string;
  toLabel: string;
  fromSymbol: string;
  toSymbol: string;
  /** Values to tabulate in the quick-reference table. */
  tableValues: number[];
  /** Prose explaining where the units come from and when each is used. */
  explanation: ReactNode;
  faqs: FaqEntry[];
  /** Full converter to link through to. */
  converterUrl: string;
  converterName: string;
}

function format(value: number): string {
  if (value !== 0 && Math.abs(value) < 0.001) {
    return value.toExponential(4);
  }

  // Six significant figures is enough for reference use and avoids showing
  // floating-point noise on values that are exact by definition.
  return Number(value.toPrecision(6)).toLocaleString('en-GB', {
    maximumFractionDigits: 6,
  });
}

/**
 * Template for a single high-intent conversion pair. Every figure shown is
 * computed with the same convertByType the converters use, so the published
 * tables cannot drift away from the tool.
 */
export default function ConversionPairPage({
  title,
  subtitle,
  conversionType,
  fromUnit,
  toUnit,
  fromLabel,
  toLabel,
  fromSymbol,
  toSymbol,
  tableValues,
  explanation,
  faqs,
  converterUrl,
  converterName,
}: ConversionPairPageProps) {
  // Most conversions are a pure ratio, but temperature is affine: it has an
  // offset as well as a slope. Deriving both from the converter keeps the
  // formula correct for either kind instead of assuming multiplication.
  const offset = convertByType(conversionType, 0, fromUnit, toUnit);
  const slope = convertByType(conversionType, 1, fromUnit, toUnit) - offset;
  const isAffine = Math.abs(offset) > 1e-9;

  const factor = convertByType(conversionType, 1, fromUnit, toUnit);
  const inverse = convertByType(conversionType, 1, toUnit, fromUnit);

  // Prefer a value that actually demonstrates the arithmetic. Zero is a
  // useless worked example on an affine scale, and 1 is uninformative.
  const exampleValue =
    tableValues.find((value) => value > 1) ?? tableValues[tableValues.length - 1];
  const exampleResult = convertByType(conversionType, exampleValue, fromUnit, toUnit);
  const formula = isAffine
    ? `${toLabel} = ${fromLabel} × ${format(slope)} ${offset < 0 ? '−' : '+'} ${format(Math.abs(offset))}`
    : `${toLabel} = ${fromLabel} × ${format(slope)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs trail={[{ name: converterName, url: converterUrl }, { name: title }]} />

        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </header>

        <main className="max-w-3xl mx-auto">
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 text-center">
            <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
              Conversion factor
            </p>
            {isAffine ? (
              <>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {formula}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  0 {fromSymbol} = {format(offset)} {toSymbol}, and every 1 {fromSymbol} adds{' '}
                  {format(slope)} {toSymbol}
                </p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  1 {fromSymbol} = {format(factor)} {toSymbol}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  and 1 {toSymbol} = {format(inverse)} {fromSymbol}
                </p>
              </>
            )}
          </section>

          <AdBanner position="top" />

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              The formula
            </h2>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-900 rounded p-4 mb-4 text-gray-800 dark:text-gray-200">
              {formula}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong>Worked example.</strong>{' '}
              {isAffine ? (
                <>
                  To convert {exampleValue} {fromSymbol}, multiply by {format(slope)} then{' '}
                  {offset < 0 ? 'subtract' : 'add'} {format(Math.abs(offset))}:{' '}
                  {exampleValue} × {format(slope)} {offset < 0 ? '−' : '+'} {format(Math.abs(offset))}{' '}
                  = {format(exampleResult)} {toSymbol}.
                </>
              ) : (
                <>
                  To convert {exampleValue} {fromSymbol}, multiply by {format(slope)}:{' '}
                  {exampleValue} × {format(slope)} = {format(exampleResult)} {toSymbol}.
                </>
              )}
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              {title} conversion table
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                      {fromLabel} ({fromSymbol})
                    </th>
                    <th className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                      {toLabel} ({toSymbol})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableValues.map((value) => (
                    <tr key={value} className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="py-2 pr-4 text-gray-700 dark:text-gray-300">{value}</td>
                      <td className="py-2 pr-4 font-mono text-sm text-gray-700 dark:text-gray-300">
                        {format(convertByType(conversionType, value, fromUnit, toUnit))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 my-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              About {fromLabel} and {toLabel}
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              {explanation}
            </div>
          </section>

          <section className="bg-blue-600 text-white rounded-xl shadow-lg p-8 my-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Need other units?</h2>
            <p className="text-blue-100 mb-6">
              The full {converterName.toLowerCase()} handles every unit in this family.
            </p>
            <Link
              href={converterUrl}
              className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Open the {converterName}
            </Link>
          </section>

          <FaqSection entries={faqs} />
          <AdBanner position="inline" />
          <RelatedTools currentUrl={converterUrl} />
        </main>
      </div>
    </div>
  );
}
