import ConversionPairPage from "@/components/ConversionPairPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cups to Grams Converter - Flour, Sugar & Butter Weights",
  description:
    "Convert cups to grams. A cup is a volume, so grams depend on the ingredient: flour 120 g, sugar 200 g, butter 227 g per cup. Full ingredient table.",
  alternates: { canonical: "https://freeunitconvertor.com/cups-to-grams" },
  openGraph: {
    title: "Cups to Grams Converter - Flour, Sugar & Butter Weights",
    description: "A cup is a volume, so grams vary by ingredient. Full conversion table.",
    url: "https://freeunitconvertor.com/cups-to-grams",
  },
};

export default function CupsToGramsPage() {
  return (
    <ConversionPairPage
      title="Cups to Millilitres"
      subtitle="A cup measures volume, not weight. Convert to millilitres here, then use the ingredient table below for grams."
      conversionType="cooking"
      fromUnit="cup"
      toUnit="ml"
      fromLabel="cups"
      toLabel="millilitres"
      fromSymbol="cup"
      toSymbol="ml"
      tableValues={[0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 3, 4]}
      converterUrl="/cooking"
      converterName="Cooking Converter"
      explanation={
        <>
          <p>
            There is no single cups-to-grams number, and any site that gives you one is being
            careless. A cup measures <strong>volume</strong>; a gram measures <strong>mass</strong>.
            How many grams fit in a cup depends entirely on the density of what you are measuring.
            A cup of flour and a cup of honey differ by nearly a factor of three.
          </p>
          <p>
            This converter uses the 240 ml metric cup, the figure most modern recipes assume. Be
            aware that the US customary cup is 236.6 ml and an Australian cup is 250 ml. The
            difference is small enough to ignore for soups and large enough to matter for baking.
          </p>
          <p>
            Approximate weights for one 240 ml cup: plain flour 120 g, granulated sugar 200 g,
            brown sugar packed 220 g, butter 227 g, milk 240 g, water 240 g, rolled oats 90 g,
            rice uncooked 185 g, cocoa powder 100 g, honey 340 g. Flour is the least reliable of
            these, since scooping rather than spooning can change the figure by 20%. For baking,
            weighing is genuinely more accurate than measuring by volume.
          </p>
        </>
      }
      faqs={[
        {
          question: "How many grams are in a cup?",
          answer:
            "It depends on the ingredient, because a cup is a measure of volume rather than weight. One cup holds about 120 g of plain flour, 200 g of granulated sugar, 227 g of butter or 240 g of water.",
        },
        {
          question: "How many grams of flour are in a cup?",
          answer:
            "About 120 g for plain or all-purpose flour. This is the least consistent common ingredient: scooping the cup directly from the bag compacts the flour and can push it to 145 g or more. Spoon it in loosely and level off.",
        },
        {
          question: "How many millilitres are in a cup?",
          answer:
            "240 ml for the metric cup used here and by most modern recipes. A US customary cup is 236.6 ml and an Australian cup is 250 ml.",
        },
        {
          question: "Why do recipes use cups at all?",
          answer:
            "Speed and familiarity, particularly in American cooking, where volume measures need no scales. Professional and European baking prefers weight because it is reproducible regardless of how the ingredient is packed.",
        },
        {
          question: "Should I weigh ingredients instead?",
          answer:
            "For baking, yes. Bread and cake recipes depend on ratios between flour, liquid and fat, and volume measurement introduces enough variation to change the result. For soups, stews and general cooking, cups are perfectly adequate.",
        },
      ]}
    />
  );
}
