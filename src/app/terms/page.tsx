import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Unit Converter",
  description: "Read the Terms of Service for Unit Converter. Learn the rules and guidelines for using our service.",
  openGraph: {
    title: "Terms of Service | Unit Converter",
    description: "Read the Terms of Service for Unit Converter. Learn the rules and guidelines for using our service.",
    type: "article",
  },
  alternates: {
    canonical: "https://freeunitconvertor.com/terms",
  },
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-300">These Terms govern your use of the Unit Converter website and services.</p>
        </header>

        <main className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              By accessing or using Unit Converter, you agree to these Terms. If you do not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Use of the Service</h2>
            <p className="text-gray-700 dark:text-gray-300">
              You may use our unit conversion tools and developer utilities for personal or educational purposes. Commercial use requires permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">User Responsibilities</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Users must use the service responsibly and not attempt to harm or exploit the website or other users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Advertising & Monetization</h2>
            <p className="text-gray-700 dark:text-gray-300">
              This website displays advertising, including Google AdSense. Ads may be personalized based on cookies and similar technologies. Your use of the site constitutes your acknowledgment that third-party vendors, including Google, may use cookies to serve ads based on your prior visits to this and other websites. For details, see our Privacy Policy and Google’s Ads Settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300">
              All content, tools, and software on Unit Converter are the property of the website owner and protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300">
              The service is provided &quot;as is&quot; without warranties. We are not liable for any damages arising from the use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update these Terms from time to time. Changes will be posted on this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Contact</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Questions about these Terms? Visit our Contact page or email us at sajidisrar86@gmail.com.
            </p>
          </section>

          <section>
            <p className="text-xs text-gray-500 dark:text-gray-400">Effective date: 2024-01-01</p>
          </section>
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://freeunitconvertor.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Terms of Service",
                  "item": "https://freeunitconvertor.com/terms"
                }
              ]
            })
          }}
        />
      </div>
    </div>
  );
}
