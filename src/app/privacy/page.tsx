import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Unit Converter",
  description: "Read the Privacy Policy for Unit Converter. Learn how we collect, use, and protect your data.",
  openGraph: {
    title: "Privacy Policy | Unit Converter",
    description: "Read the Privacy Policy for Unit Converter. Learn how we collect, use, and protect your data.",
    type: "article",
  },
  alternates: {
    canonical: "https://freeunitconvertor.com/privacy",
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Google AdSense</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We display ads served by Google AdSense on this website. Google uses cookies to serve ads based on your prior visits to this and other websites. Google’s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              You may opt out of personalized advertising by visiting Google’s Ads Settings at <a href="https://adssettings.google.com/" className="text-blue-600 dark:text-blue-400 underline" rel="nofollow noopener" target="_blank">adssettings.google.com</a>. Alternatively, you can opt out of a third-party vendor’s use of cookies for personalized advertising by visiting <a href="https://youradchoices.com/" className="text-blue-600 dark:text-blue-400 underline" rel="nofollow noopener" target="_blank">youradchoices.com</a> (US) or <a href="https://www.youronlinechoices.com/" className="text-blue-600 dark:text-blue-400 underline" rel="nofollow noopener" target="_blank">youronlinechoices.com</a> (EU).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">GDPR / UK GDPR</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you are located in the EEA or the UK, you have the right to access, rectify, or erase your personal data; restrict or object to processing; and the right to data portability. Where we rely on consent for processing (e.g., personalized ads), you have the right to withdraw consent at any time.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              To exercise your rights, please contact us at <a href="mailto:sajidisrar86@gmail.com" className="text-blue-600 dark:text-blue-400 underline">sajidisrar86@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">CCPA / CPRA (California)</h2>
            <p className="text-gray-700 dark:text-gray-300">
              California residents have the right to know what personal information is collected, used, disclosed, or sold; the right to request deletion of personal information; the right to opt out of the sale or sharing of personal information; and the right to non-discrimination for exercising these rights.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              To submit a request or opt out, please contact us at <a href="mailto:sajidisrar86@gmail.com" className="text-blue-600 dark:text-blue-400 underline">sajidisrar86@gmail.com</a>.
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
              Questions about this policy? Visit our Contact page or email us at sajidisrar86@gmail.com.
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
                  "name": "Privacy Policy",
                  "item": "https://freeunitconvertor.com/privacy"
                }
              ]
            })
          }}
        />
      </div>
    </div>
  );
}


