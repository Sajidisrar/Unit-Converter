import ConversionPairPage from "@/components/ConversionPairPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metres to Feet Converter - m to ft with Formula & Table",
  description:
    "Convert metres to feet instantly. 1 metre = 3.28084 feet. Includes the exact formula, a worked example and a quick-reference conversion table.",
  alternates: { canonical: "https://freeunitconvertor.com/meters-to-feet" },
  openGraph: {
    title: "Metres to Feet Converter - m to ft with Formula & Table",
    description: "1 metre = 3.28084 feet. Formula, worked example and conversion table.",
    url: "https://freeunitconvertor.com/meters-to-feet",
  },
};

export default function MetersToFeetPage() {
  return (
    <ConversionPairPage
      title="Metres to Feet"
      subtitle="Convert metres to feet using the exact international definition of the foot."
      conversionType="length"
      fromUnit="m"
      toUnit="ft"
      fromLabel="metres"
      toLabel="feet"
      fromSymbol="m"
      toSymbol="ft"
      tableValues={[1, 2, 5, 10, 20, 50, 100, 500, 1000]}
      converterUrl="/unit-converter"
      converterName="Unit Converter"
      explanation={
        <>
          <p>
            The relationship between the two is exact rather than approximate. Since 1959 the
            international foot has been defined as exactly 0.3048 metres, agreed between the
            English-speaking countries to end a long-running discrepancy between national
            standards. Everything else follows: an inch is 25.4 millimetres, a yard is 0.9144
            metres, and a metre works out at 3.280839895 feet.
          </p>
          <p>
            The metre itself is defined by the speed of light, as the distance light travels in
            vacuum in 1/299,792,458 of a second. That definition replaced the old platinum-iridium
            bar in 1983 and is what makes the metre reproducible in any properly equipped lab.
          </p>
          <p>
            Feet remain standard in construction and aviation in the United States, and in
            everyday height in both the US and UK, while almost everything else is metric. Note
            that US surveying used a slightly different &ldquo;survey foot&rdquo; until it was
            officially retired at the end of 2022; the difference is about two parts per million,
            which matters over long distances but not for ordinary conversions.
          </p>
        </>
      }
      faqs={[
        {
          question: "How many feet are in a metre?",
          answer:
            "One metre is 3.280839895 feet, usually rounded to 3.28084. The figure is exact because the foot is defined as exactly 0.3048 metres.",
        },
        {
          question: "How do I convert metres to feet in my head?",
          answer:
            "Multiply by three and add ten percent. For 10 metres: 30 plus 3 gives 33 feet, against the true 32.8. It is accurate to within about half a percent, which is fine for rough work.",
        },
        {
          question: "How tall is 1.8 metres in feet and inches?",
          answer:
            "1.8 metres is 5.9055 feet, which is 5 feet 10.9 inches. To get inches from the decimal part, multiply it by 12.",
        },
        {
          question: "Is the conversion exact or approximate?",
          answer:
            "Exact. One foot is defined as precisely 0.3048 metres, so metres to feet involves no rounding at the definition level. Any imprecision comes only from rounding the displayed result.",
        },
      ]}
    />
  );
}
