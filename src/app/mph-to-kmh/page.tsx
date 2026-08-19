import ConversionPairPage from "@/components/ConversionPairPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MPH to KMH Converter - Miles per Hour to km/h with Table",
  description:
    "Convert mph to km/h. 1 mph = 1.609344 km/h exactly. Formula, worked example and a table of common UK and European speed limits.",
  alternates: { canonical: "https://freeunitconvertor.com/mph-to-kmh" },
  openGraph: {
    title: "MPH to KMH Converter - Miles per Hour to km/h with Table",
    description: "1 mph = 1.609344 km/h. Formula, table and common speed limits.",
    url: "https://freeunitconvertor.com/mph-to-kmh",
  },
};

export default function MphToKmhPage() {
  return (
    <ConversionPairPage
      title="MPH to KM/H"
      subtitle="Convert miles per hour to kilometres per hour, with the common speed limits tabulated."
      conversionType="speed"
      fromUnit="mph"
      toUnit="km/h"
      fromLabel="miles per hour"
      toLabel="kilometres per hour"
      fromSymbol="mph"
      toSymbol="km/h"
      tableValues={[10, 20, 30, 40, 50, 60, 70, 80, 100]}
      converterUrl="/unit-converter"
      converterName="Unit Converter"
      explanation={
        <>
          <p>
            Speed converts with exactly the same factor as distance, because the time unit is the
            same on both sides. One mile per hour is 1.609344 km/h, so the conversion is a single
            multiplication with no offset.
          </p>
          <p>
            The numbers worth memorising are the speed limits. UK limits of 20, 30, 40, 60 and 70
            mph become 32, 48, 64, 97 and 113 km/h. European limits translate the other way: 50
            km/h is 31 mph, 80 km/h is 50 mph, 130 km/h is 81 mph.
          </p>
          <p>
            Most cars sold in the UK and Ireland show both scales on the dial, with km/h on the
            inner ring. Rental cars abroad often display only one, and digital dashboards usually
            let you switch. A useful check when driving in Europe: 100 km/h is 62 mph, close to a
            UK dual carriageway limit.
          </p>
        </>
      }
      faqs={[
        {
          question: "How do I convert mph to km/h?",
          answer:
            "Multiply by 1.609344. For a quick estimate, multiply by 1.6, or add half again plus a tenth. 60 mph is 96.6 km/h.",
        },
        {
          question: "What is 70 mph in km/h?",
          answer:
            "112.65 km/h. That is the UK motorway limit, which is slightly below the 120 or 130 km/h limits common on European motorways.",
        },
        {
          question: "What is 100 km/h in mph?",
          answer:
            "62.14 mph. Divide km/h by 1.609344, or multiply by roughly 0.62.",
        },
        {
          question: "Which countries still use mph?",
          answer:
            "The United Kingdom and the United States are the main ones for road speed, along with a handful of smaller territories. Most of the world posts limits in km/h.",
        },
      ]}
    />
  );
}
