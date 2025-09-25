import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Unit Converter",
  description: "Read the Privacy Policy for Unit Converter. Learn how we collect, use, and protect your data.",
  openGraph: {
    title: "Privacy Policy | Unit Converter",
    description: "Read the Privacy Policy for Unit Converter. Learn how we collect, use, and protect your data.",
    type: "article",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-300">Your privacy matters. This page explains how we handle your data.</p>
        </header>

        <main className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Information We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We do not require user accounts and we do not collect personally identifiable information. We may collect
              anonymous analytics such as page views and basic usage metrics to improve the product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may use cookies or similar technologies to provide essential functionality and improve user experience.
              You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Third-Party Services</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may use third-party analytics or advertising services which may set their own cookies. These providers
              have their own privacy policies governing the use of data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We implement reasonable measures to protect information from unauthorized access, alteration, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Contact</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Questions about this policy? Visit our Contact page or email us at contact@example.com.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}


