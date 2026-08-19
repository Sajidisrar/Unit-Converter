import ConversionPairPage from "@/components/ConversionPairPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grams to Ounces Converter - g to oz with Formula & Table",
  description:
    "Convert grams to ounces. 1 gram = 0.035274 oz. Formula, worked example and a conversion table for cooking and postage weights.",
  alternates: { canonical: "https://freeunitconvertor.com/grams-to-ounces" },
  openGraph: {
    title: "Grams to Ounces Converter - g to oz with Formula & Table",
    description: "1 gram = 0.035274 oz. Formula, worked example and conversion table.",
    url: "https://freeunitconvertor.com/grams-to-ounces",
  },
};

export default function GramsToOuncesPage() {
  return (
    <ConversionPairPage
      title="Grams to Ounces"
      subtitle="Convert grams to avoirdupois ounces, the ounce used for food and postage."
      conversionType="weight"
      fromUnit="g"
      toUnit="oz"
      fromLabel="grams"
      toLabel="ounces"
      fromSymbol="g"
      toSymbol="oz"
      tableValues={[10, 25, 50, 100, 200, 250, 450, 500, 1000]}
      converterUrl="/unit-converter"
      converterName="Unit Converter"
      explanation={
        <>
          <p>
            The avoirdupois ounce is one sixteenth of a pound, which makes it exactly 28.349523125
            grams. Going the other way, a gram is 0.03527396 ounces. It is the ounce meant on food
            packaging, kitchen scales and postal rates.
          </p>
          <p>
            Two other ounces exist and are easy to confuse with it. The <strong>troy ounce</strong>,
            used for precious metals, is 31.1035 grams, about 10% heavier, so a troy ounce of gold
            is not the same as an ounce of flour. The <strong>fluid ounce</strong> is not a weight
            at all but a volume, roughly 29.6 ml in the US and 28.4 ml in the UK. Recipes that
            switch between weight and fluid ounces without saying so are a common source of error;
            the <a href="/volume" className="text-blue-600 dark:text-blue-400 hover:underline">volume
            converter</a> handles the fluid kind.
          </p>
          <p>
            Useful anchors for cooking: 100 g is 3.53 oz, 250 g is 8.82 oz, and a pound is 453.6 g.
            British recipes from before metrication often use 4 oz or 8 oz quantities, which are
            113 g and 227 g.
          </p>
        </>
      }
      faqs={[
        {
          question: "How many grams are in an ounce?",
          answer:
            "28.349523125 grams exactly, normally rounded to 28.35. That is the avoirdupois ounce used for food and postage.",
        },
        {
          question: "How many ounces is 100 grams?",
          answer:
            "3.5274 ounces. For kitchen use, 100 g is close enough to three and a half ounces.",
        },
        {
          question: "Is a troy ounce the same as a normal ounce?",
          answer:
            "No. A troy ounce is 31.1035 grams and is used only for precious metals. The ordinary avoirdupois ounce is 28.35 grams, roughly 10% lighter.",
        },
        {
          question: "How many grams are in a pound?",
          answer:
            "453.59237 grams, since a pound is 16 ounces. Recipes usually round this to 450 g.",
        },
      ]}
    />
  );
}
