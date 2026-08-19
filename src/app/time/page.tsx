import ConverterPageClient from "@/components/ConverterPageClient";
import ConversionTable from "@/components/shared/ConversionTable";
import FaqSection from "@/components/shared/FaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import { timeUnits } from "@/utils/conversions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Converter - Seconds, Minutes, Hours, Days & Years",
  description:
    "Convert between milliseconds, seconds, minutes, hours, days, weeks, months and years. Uses the average Gregorian year so long-range conversions stay accurate.",
  alternates: { canonical: "https://freeunitconvertor.com/time" },
  openGraph: {
    title: "Time Converter - Seconds, Minutes, Hours, Days & Years",
    description: "Convert milliseconds, seconds, minutes, hours, days, weeks, months and years.",
    url: "https://freeunitconvertor.com/time",
  },
};

export default function TimePage() {
  const seoContent = (
    <>
      <section className="card-panel p-8 my-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          How time units relate
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Everything up to a week is exact: 60 seconds to a minute, 60 minutes to an hour,
          24 hours to a day, 7 days to a week. Conversions in that range are simple
          multiplication and carry no ambiguity.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Months and years are the awkward ones, because calendar months vary from 28 to 31 days
          and years vary with leap days. This converter uses the <strong>average Gregorian
          year of 365.2425 days</strong> and defines a month as one twelfth of that, which is
          30.436875 days. That is the right choice for rates, durations and projections. It is
          the wrong choice for calendar arithmetic: if you need to know the date 18 months from
          a specific day, count the actual months rather than multiplying.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          The 365.2425 figure comes from the Gregorian leap rule: every fourth year is a leap
          year, except centuries, except centuries divisible by 400.
        </p>
      </section>

      <ConversionTable
        caption="Common time conversions"
        columns={["Conversion", "Result"]}
        rows={[
          ["1 minute", "60 seconds"],
          ["1 hour", "3600 seconds"],
          ["1 day", "86,400 seconds"],
          ["1 week", "604,800 seconds"],
          ["1 day", "1440 minutes"],
          ["1 week", "168 hours"],
          ["1 average month", "30.436875 days"],
          ["1 average year", "365.2425 days"],
          ["1 average year", "8765.82 hours"],
          ["1 second", "1000 milliseconds"],
        ]}
      />

      <RelatedTools currentUrl="/time" />
    </>
  );

  const faqContent = (
    <FaqSection
      entries={[
        {
          question: "How many seconds are in a day?",
          answer:
            "86,400 seconds: 24 hours of 60 minutes of 60 seconds. Occasional leap seconds are added to UTC to keep clocks aligned with the Earth's rotation, but they are rare and not included here.",
        },
        {
          question: "How many days are in a month?",
          answer:
            "Calendar months run from 28 to 31 days. For conversion purposes this tool uses the average of 30.436875 days, which is one twelfth of the average Gregorian year. Use actual calendar dates if you need exact scheduling.",
        },
        {
          question: "Why is a year 365.2425 days rather than 365?",
          answer:
            "The Earth's orbit takes slightly under 365.25 days. The Gregorian calendar adds a leap day every four years, skips it on century years, but restores it on centuries divisible by 400. Averaged out, that gives 365.2425 days per year.",
        },
        {
          question: "How many hours are in a working year?",
          answer:
            "A full calendar year averages 8765.82 hours. A typical full-time working year is closer to 1800 to 2000 hours once weekends and leave are removed.",
        },
      ]}
    />
  );

  return (
    <ConverterPageClient
      title="Time Converter"
      subtitle="Convert milliseconds, seconds, minutes, hours, days, weeks, months and years."
      units={timeUnits}
      conversionType="time"
      defaultFromUnit="h"
      seoContent={seoContent}
      faqContent={faqContent}
      toolUrl="/time"
    />
  );
}
