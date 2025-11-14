import ConverterPageClient from "@/components/ConverterPageClient";
import { cookingUnits } from "@/utils/conversions";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cooking Unit Converter - Cups to Grams | Free Online Tool",
  description: "Convert cooking measurements between cups, tablespoons, grams, ounces, and milliliters. Free online cooking converter for bakers, chefs, and home cooks.",
  keywords:
    "cooking unit converter, cooking measurements, cups to grams, tablespoons to ounces, cooking conversion, kitchen measurements",
  alternates: {
    canonical: 'https://freeunitconvertor.com/cooking',
  },
  openGraph: {
    title: "Cooking Unit Converter - Cups to Grams | Free Online Tool",
    description: "Convert cooking measurements between cups, tablespoons, grams, ounces, and milliliters. Free online cooking converter for bakers, chefs, and home cooks.",
  },
};

export default function CookingPage({ searchParams }: { searchParams: { from?: string } }) {
  const defaultFromUnit = searchParams.from || "cup";

  const seoContent = (
    <>
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Cooking Measurement Guide</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Understanding cooking measurements is essential for following recipes from different countries and cultures. Use our converter above for instant results.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-6">Baking Conversions</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Convert cups, tablespoons, teaspoons, grams, and ounces for baking and meal prep. Pair with the <a href="/weight" className="text-orange-600 dark:text-orange-400 hover:underline">Unit converter weight</a> for ingredient weight tracking and the <a href="/temperature" className="text-orange-600 dark:text-orange-400 hover:underline">Temperature Converter</a> for oven settings.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 mt-6">International Recipe Scaling</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Baking essentials:</strong> 1 cup = 240ml, 1 tbsp = 15ml, 1 tsp = 5ml<br/>
            <strong>Example:</strong> 1 cup flour = 120g, 1 lb = 453.59g<br/>
            <strong>For liquids:</strong> 1 cup = 8 fl oz, 1 pint = 2 cups, 1 quart = 4 cups
          </p>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Convert cups, tablespoons, teaspoons, grams, and ounces for baking and meal prep. Pair with the <a href="/weight" className="text-orange-600 dark:text-orange-400 hover:underline">Unit converter weight</a> for ingredient weight tracking and the <a href="/temperature" className="text-orange-600 dark:text-orange-400 hover:underline">Temperature Converter</a> for oven settings.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Recipe systems and nutrition apps often require unit conversions like <b>grams to cups</b>, <b>ml to tablespoons</b>, and <b>ounces to grams</b> for accurate calculations. Developers working on food-related apps may also use <a href="/developer" className="text-orange-600 dark:text-orange-400 hover:underline">JSON to CSV</a> for recipe datasets and <a href="/developer" className="text-orange-600 dark:text-orange-400 hover:underline">Base64 encoding</a> for storing recipe images, especially in <b>AI artificial intelligence</b> nutrition analysis and <b>data science pipelines</b>.
        </p>
      </section>

      <section className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-10 my-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          About Cooking Conversions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-4 leading-relaxed">
          Cooking conversions are essential for following recipes from different countries and cultures. Whether you&apos;re baking a cake, preparing a traditional dish, or scaling recipes up or down, accurate measurements ensure consistent results.
        </p>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-6 leading-relaxed">
          For example, when following European recipes, you might need to convert <b>grams to cups</b> for flour or <b>milliliters to cups</b> for liquids. American recipes often use cups and tablespoons, while European recipes prefer metric measurements like grams and liters. Professional chefs rely on weight-based measurements such as <b>grams to ounces</b> for precision, while home cooks often search for quick conversions like <b>cups to grams for sugar</b> or <b>tablespoons to ml</b>.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/weight" className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
            Weight Converter
          </a>
          <a href="/temperature" className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
            Temperature Converter
          </a>
          <a href="/fitness" className="inline-block mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
            Fitness Converter
          </a>
        </div>
      </section>
    </>
  );

  const faqContent = (
    <section>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Note: Gram (g) assumes water-equivalent density for volume-to-weight conversions.</p>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold text-gray-900 dark:text-white">
              What is the difference between dry and liquid cooking measurements?
            </dt>
            <dd className="text-gray-600 dark:text-gray-300">
              Dry measurements refer to the weight or volume of solid ingredients, while liquid measurements refer to the volume of liquids. Using the correct type ensures accurate recipes.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900 dark:text-white">
              How do I convert cups to milliliters?
            </dt>
            <dd className="text-gray-600 dark:text-gray-300">
              One cup is approximately 240 milliliters. Our converter provides precise conversions based on ingredient density.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900 dark:text-white">
              Are kitchen unit conversions accurate?
            </dt>
            <dd className="text-gray-600 dark:text-gray-300">
              Kitchen conversions provide approximate values suitable for most recipes. For precise baking or cooking, use a kitchen scale.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900 dark:text-white">
              How do I convert tablespoons to grams?
            </dt>
            <dd className="text-gray-600 dark:text-gray-300">
              The conversion depends on the ingredient. For water, 1 tablespoon = 15 grams. For flour, 1 tablespoon = 8-9 grams. Use our converter for accurate measurements.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900 dark:text-white">
              What&apos;s the difference between US and metric cups?
            </dt>
            <dd className="text-gray-600 dark:text-gray-300">
              A US cup is 240ml, while a metric cup is 250ml. Our converter uses US measurements. For precise baking, always use the same measurement system throughout your recipe.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900 dark:text-white">
              How many grams are in a cup of sugar or flour?
            </dt>
            <dd className="text-gray-600 dark:text-gray-300">
              A cup of sugar is about 200 grams, while a cup of all-purpose flour is about 120 grams. The exact conversion depends on the ingredient density, so our cooking unit converter ensures accuracy.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );

  return (
    <ConverterPageClient
      title="Cooking Unit Converter"
      subtitle="Convert common cooking measurements like cups to grams, tablespoons to ounces, grams to teaspoons, and cups to milliliters. This cooking unit converter is designed for bakers, chefs, and home cooks who need accurate conversions for recipes from around the world."
      units={cookingUnits}
      conversionType="cooking"
      defaultFromUnit={defaultFromUnit}
      seoContent={seoContent}
      faqContent={faqContent}
    />
  );
}
