import AdBanner from "@/components/AdBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import RecipeScalerClient from "@/components/RecipeScalerClient";
import FaqSection from "@/components/shared/FaqSection";
import RelatedTools from "@/components/shared/RelatedTools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipe Scaler - Halve or Double a Recipe and Convert Units",
  description:
    "Paste a recipe, change the number of servings, and every quantity is rescaled for you. Optionally converts cups to grams using real ingredient densities.",
  alternates: { canonical: "https://freeunitconvertor.com/recipe-scaler" },
  openGraph: {
    title: "Recipe Scaler - Halve or Double a Recipe and Convert Units",
    description:
      "Paste a recipe, change the servings, and every quantity is rescaled — with cups to grams by ingredient.",
    url: "https://freeunitconvertor.com/recipe-scaler",
  },
};

export default function RecipeScalerPage() {
  return (
    <div className="page-ground">
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <Breadcrumbs trail={[{ name: "Kitchen" }, { name: "Recipe Scaler", url: "/recipe-scaler" }]} />

        <header className="mb-10">
          <p className="eyebrow mb-3">Kitchen</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-gray-900 dark:text-white mb-4">
            Recipe Scaler
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Paste an ingredient list, say how many people you are cooking for, and every quantity
            is rescaled — with awkward amounts rounded to fractions you can actually measure.
          </p>
        </header>

        <main>
          <AdBanner position="top" />

          <div className="my-8">
            <RecipeScalerClient />
          </div>

          <section className="card-panel p-8 my-8">
            <p className="eyebrow mb-2">How it works</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Scaling a recipe is not just multiplication
            </h2>
            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              <p>
                Multiplying by 2.5 is easy. The awkward part is what comes out the other side:
                two-thirds of a cup becomes 1.6666666 cups, and no one owns that measuring cup.
                Every scaled amount here is snapped to a fraction you can actually measure — halves,
                thirds, quarters and eighths — so the result is something you can cook from.
              </p>
              <p>
                Lines the parser cannot read are kept exactly as you wrote them rather than being
                dropped. &ldquo;Salt to taste&rdquo; has no quantity to scale, and losing an
                ingredient from a recipe would be far worse than leaving it alone. Anything it gets
                wrong you can correct in the table, and the scaled column updates as you type.
              </p>
              <p>
                Switching on <strong>convert volumes to grams</strong> uses the real density of each
                ingredient it recognises. A cup of flour becomes 120 g, a cup of honey 340 g — the
                same figures behind the{" "}
                <a href="/cooking" className="text-[var(--accent)] hover:underline">cooking converter</a>.
                Weighing is more reliable than measuring by volume, particularly for flour.
              </p>
            </div>
          </section>

          <AdBanner position="inline" />

          <FaqSection
            entries={[
              {
                question: "How do I halve a recipe?",
                answer:
                  "Paste the ingredients, set the original servings, then set the target to half that number. Every quantity is divided and rounded to a measurable fraction, so 3/4 cup becomes 3/8 rather than 0.375.",
              },
              {
                question: "What if it misreads one of my ingredients?",
                answer:
                  "Correct it in the table. Amount, unit and ingredient are all editable and the scaled column updates immediately. Nothing is discarded during parsing — a line it cannot read is shown unchanged so you can fix it.",
              },
              {
                question: "Can it convert cups to grams?",
                answer:
                  "Yes, with the convert-to-grams option. It uses the actual density of each recognised ingredient rather than assuming everything weighs the same as water, which is why a cup of flour gives 120 g and a cup of honey 340 g.",
              },
              {
                question: "Does scaling work for baking?",
                answer:
                  "For ingredient quantities, yes, and weighing rather than measuring by volume makes it more reliable still. Bear in mind that tin size, oven temperature and baking time do not scale linearly — a doubled cake batter in the same tin needs longer at a slightly lower temperature.",
              },
              {
                question: "Are the ingredient weights exact?",
                answer:
                  "They are widely used reference figures, not guarantees. Flour is the least consistent: scooping straight from the bag compacts it and can push 120 g towards 145 g. Spoon it in loosely and level it off.",
              },
            ]}
          />

          <RelatedTools currentUrl="/recipe-scaler" />
        </main>
      </div>
    </div>
  );
}
