import ConversionPairPage from "@/components/ConversionPairPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Miles to KM Converter - Miles to Kilometres with Table",
  description:
    "Convert miles to kilometres. 1 mile = 1.609344 km exactly. Formula, worked example, conversion table and common running distances.",
  alternates: { canonical: "https://freeunitconvertor.com/miles-to-km" },
  openGraph: {
    title: "Miles to KM Converter - Miles to Kilometres with Table",
    description: "1 mile = 1.609344 km exactly. Formula, worked example and conversion table.",
    url: "https://freeunitconvertor.com/miles-to-km",
  },
};

export default function MilesToKmPage() {
  return (
    <ConversionPairPage
      title="Miles to Kilometres"
      subtitle="Convert miles to kilometres. One mile is exactly 1.609344 kilometres."
      conversionType="length"
      fromUnit="mi"
      toUnit="km"
      fromLabel="miles"
      toLabel="kilometres"
      fromSymbol="mi"
      toSymbol="km"
      tableValues={[1, 3, 5, 10, 13.1, 26.2, 50, 60, 100]}
      converterUrl="/unit-converter"
      converterName="Unit Converter"
      explanation={
        <>
          <p>
            A statute mile is 5280 feet, and since a foot is exactly 0.3048 metres, a mile is
            exactly 1609.344 metres or 1.609344 kilometres. The oddly specific 5280 is a historical
            accident: the Roman mile was a thousand paces, later reconciled with the English furlong
            so that eight furlongs made a mile.
          </p>
          <p>
            The UK is the main holdout in Europe for road distances and speed limits in miles,
            alongside the US. Almost everywhere else uses kilometres, which is why hire car
            speedometers and satnavs need switching when you cross a border.
          </p>
          <p>
            Running distances make the conversion concrete. A 5K is 3.11 miles, a 10K is 6.21
            miles, a half marathon is 13.1 miles or 21.1 km, and a marathon is 26.2 miles or
            42.195 km. Do not confuse the statute mile with the nautical mile, which is 1852 metres
            exactly and used in aviation and at sea.
          </p>
        </>
      }
      faqs={[
        {
          question: "How many kilometres are in a mile?",
          answer:
            "Exactly 1.609344 kilometres, usually rounded to 1.61. The figure is exact because both the mile and the kilometre are defined in terms of the metre.",
        },
        {
          question: "What is a quick way to convert miles to km?",
          answer:
            "Multiply by 1.6, or add about 60%. For a rougher estimate, successive Fibonacci numbers work surprisingly well: 5 miles is about 8 km, 8 miles about 13 km, because the golden ratio is close to 1.609.",
        },
        {
          question: "How many miles is a 5K run?",
          answer:
            "3.107 miles. A 10K is 6.214 miles, a half marathon is 13.109 miles and a full marathon is 26.219 miles.",
        },
        {
          question: "Is a nautical mile the same as a mile?",
          answer:
            "No. A nautical mile is 1852 metres, about 15% longer than a statute mile. It is based on one minute of latitude, which is why it is used for navigation at sea and in the air.",
        },
        {
          question: "What is 60 mph in km/h?",
          answer:
            "96.56 km/h. Speed converts with the same factor as distance, so multiply mph by 1.609344. The common UK 70 mph limit is 112.65 km/h.",
        },
      ]}
    />
  );
}
