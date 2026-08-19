import ConversionPairPage from "@/components/ConversionPairPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kg to Lbs Converter - Kilograms to Pounds with Table",
  description:
    "Convert kilograms to pounds instantly. 1 kg = 2.20462 lbs. Exact formula, worked example, conversion table and stone equivalents.",
  alternates: { canonical: "https://freeunitconvertor.com/kg-to-lbs" },
  openGraph: {
    title: "Kg to Lbs Converter - Kilograms to Pounds with Table",
    description: "1 kg = 2.20462 lbs. Formula, worked example and conversion table.",
    url: "https://freeunitconvertor.com/kg-to-lbs",
  },
};

export default function KgToLbsPage() {
  return (
    <ConversionPairPage
      title="Kilograms to Pounds"
      subtitle="Convert kilograms to pounds using the exact international avoirdupois pound."
      conversionType="weight"
      fromUnit="kg"
      toUnit="lb"
      fromLabel="kilograms"
      toLabel="pounds"
      fromSymbol="kg"
      toSymbol="lb"
      tableValues={[1, 5, 10, 20, 50, 60, 70, 80, 100]}
      converterUrl="/unit-converter"
      converterName="Unit Converter"
      explanation={
        <>
          <p>
            The international avoirdupois pound has been defined as exactly 0.45359237 kilograms
            since the 1959 agreement between the United States, United Kingdom and other
            Commonwealth nations. That makes one kilogram 2.2046226 pounds. Before 1959 the US and
            imperial pounds differed very slightly, which caused real problems in trade and
            engineering.
          </p>
          <p>
            The kilogram is the SI base unit of mass. Until 2019 it was defined by a physical
            cylinder held near Paris, the last SI unit to depend on an artefact. It is now defined
            through the Planck constant, so like the metre it can be realised anywhere rather than
            compared against a single object.
          </p>
          <p>
            Britain adds a third unit for body weight: the stone, equal to 14 pounds or about
            6.35 kilograms. So 70 kg is 154.3 lb, which a UK speaker would give as 11 stone 0.3
            pounds. The <a href="/fitness" className="text-blue-600 dark:text-blue-400 hover:underline">fitness
            converter</a> handles stone directly alongside BMI.
          </p>
        </>
      }
      faqs={[
        {
          question: "How many pounds are in a kilogram?",
          answer:
            "One kilogram is 2.2046226 pounds, normally rounded to 2.20462. The pound is defined as exactly 0.45359237 kg, so the relationship is exact.",
        },
        {
          question: "What is 70 kg in pounds and stone?",
          answer:
            "70 kg is 154.32 pounds. In stone that is 11 stone 0.3 pounds, since a stone is 14 pounds.",
        },
        {
          question: "How can I convert kg to lbs quickly in my head?",
          answer:
            "Double the kilograms and add ten percent. For 70 kg: 140 plus 14 gives 154 pounds, against a true 154.3. The trick works because 2.2 is close to 2 plus ten percent of 2.",
        },
        {
          question: "Are pounds a measure of mass or weight?",
          answer:
            "In everyday use the pound measures mass, and this converter treats it that way. Strictly, weight is a force and would be measured in pound-force or newtons, but outside physics the distinction is rarely made.",
        },
      ]}
    />
  );
}
