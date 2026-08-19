import ConversionPairPage from "@/components/ConversionPairPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Litres to Gallons Converter - US & UK Gallons with Table",
  description:
    "Convert litres to gallons. 1 litre = 0.264172 US gallons or 0.219969 imperial gallons. Formula, table and the difference between the two gallons.",
  alternates: { canonical: "https://freeunitconvertor.com/litres-to-gallons" },
  openGraph: {
    title: "Litres to Gallons Converter - US & UK Gallons with Table",
    description: "1 litre = 0.264172 US gallons. Formula, table and US vs UK gallon explained.",
    url: "https://freeunitconvertor.com/litres-to-gallons",
  },
};

export default function LitresToGallonsPage() {
  return (
    <ConversionPairPage
      title="Litres to US Gallons"
      subtitle="Convert litres to US gallons. Imperial gallons are about 20% larger, and covered below."
      conversionType="volume"
      fromUnit="l"
      toUnit="galUS"
      fromLabel="litres"
      toLabel="US gallons"
      fromSymbol="L"
      toSymbol="gal"
      tableValues={[1, 5, 10, 20, 40, 50, 60, 100, 200]}
      converterUrl="/volume"
      converterName="Volume Converter"
      explanation={
        <>
          <p>
            There are two gallons in common use and they are not close. A <strong>US liquid
            gallon</strong> is exactly 3.785411784 litres. An <strong>imperial gallon</strong>,
            still used in the UK for fuel economy figures, is 4.54609 litres, roughly 20% larger.
            Quoting a gallon figure without saying which one is a genuine source of error.
          </p>
          <p>
            So one litre is 0.264172 US gallons but only 0.219969 imperial gallons. A 60 litre car
            fuel tank holds 15.85 US gallons or 13.20 imperial gallons.
          </p>
          <p>
            The split is historical. The US kept the old English wine gallon of 231 cubic inches,
            while Britain redefined its gallon in 1824 as the volume of ten pounds of water. The
            two were never brought back together. This is also why US and UK miles per gallon
            figures are not comparable — see the <a href="/fuel-economy" className="text-blue-600 dark:text-blue-400 hover:underline">fuel
            economy converter</a>, which keeps them separate.
          </p>
        </>
      }
      faqs={[
        {
          question: "How many litres are in a gallon?",
          answer:
            "A US gallon is 3.785411784 litres. An imperial (UK) gallon is 4.54609 litres. Always check which gallon is meant before converting.",
        },
        {
          question: "Why is a UK gallon bigger than a US gallon?",
          answer:
            "The US retained the older English wine gallon of 231 cubic inches. Britain redefined the imperial gallon in 1824 as the volume of ten pounds of water, making it about 20% larger. The two standards were never reconciled.",
        },
        {
          question: "How many gallons is a 60 litre fuel tank?",
          answer:
            "15.85 US gallons, or 13.20 imperial gallons.",
        },
        {
          question: "Is a US gallon of petrol the same as an imperial gallon?",
          answer:
            "No, and it matters for fuel economy. A car rated at 40 US mpg is about 48 imperial mpg for identical real-world consumption, purely because the imperial gallon is larger.",
        },
      ]}
    />
  );
}
