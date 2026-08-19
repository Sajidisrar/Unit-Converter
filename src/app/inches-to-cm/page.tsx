import ConversionPairPage from "@/components/ConversionPairPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inches to CM Converter - in to cm with Formula & Table",
  description:
    "Convert inches to centimetres. 1 inch = 2.54 cm exactly. Formula, worked example, conversion table and common screen and paper sizes.",
  alternates: { canonical: "https://freeunitconvertor.com/inches-to-cm" },
  openGraph: {
    title: "Inches to CM Converter - in to cm with Formula & Table",
    description: "1 inch = 2.54 cm exactly. Formula, worked example and conversion table.",
    url: "https://freeunitconvertor.com/inches-to-cm",
  },
};

export default function InchesToCmPage() {
  return (
    <ConversionPairPage
      title="Inches to Centimetres"
      subtitle="Convert inches to centimetres. The relationship is exact: one inch is 2.54 cm."
      conversionType="length"
      fromUnit="in"
      toUnit="cm"
      fromLabel="inches"
      toLabel="centimetres"
      fromSymbol="in"
      toSymbol="cm"
      tableValues={[1, 2, 5, 10, 12, 24, 36, 48, 72]}
      converterUrl="/unit-converter"
      converterName="Unit Converter"
      explanation={
        <>
          <p>
            One inch is defined as exactly 2.54 centimetres. This is not a measured approximation
            but a definition, fixed by the 1959 international yard and pound agreement. Every other
            imperial length follows from it: a foot is 12 inches or 30.48 cm, a yard is 36 inches
            or 91.44 cm.
          </p>
          <p>
            Because the factor is exact and small, the conversion is unusually easy to do by hand.
            Multiplying by 2.5 gets you within two percent, which is close enough for most
            practical purposes, and the exact figure only adds a further 1.6%.
          </p>
          <p>
            Inches persist in some specific places even in metric countries: screen diagonals,
            pipe and fastener sizes, wheel diameters, and print resolution in dots per inch. A
            27-inch monitor is 68.58 cm corner to corner, and A4 paper at 21 × 29.7 cm is 8.27 ×
            11.69 inches, which is why it never quite matches US Letter.
          </p>
        </>
      }
      faqs={[
        {
          question: "How many centimetres are in an inch?",
          answer:
            "Exactly 2.54 centimetres. This is a definition rather than a measurement, agreed internationally in 1959, so there is no rounding involved.",
        },
        {
          question: "How do I convert inches to centimetres?",
          answer:
            "Multiply the number of inches by 2.54. A 10 inch length is 10 × 2.54 = 25.4 cm. Going the other way, divide centimetres by 2.54.",
        },
        {
          question: "What is 5 foot 10 in centimetres?",
          answer:
            "5 foot 10 is 70 inches, which is 177.8 cm. Convert feet to inches first by multiplying by 12, add the remaining inches, then multiply the total by 2.54.",
        },
        {
          question: "How big is a 27 inch monitor in centimetres?",
          answer:
            "68.58 cm measured diagonally, since screen sizes always quote the diagonal rather than the width. The actual width depends on the aspect ratio.",
        },
      ]}
    />
  );
}
