import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Unit Converter",
  description: "Get in touch with the Unit Converter team. Send feedback, report an issue, or ask a question.",
  openGraph: {
    title: "Contact Us | Unit Converter",
    description: "Get in touch with the Unit Converter team. Send feedback, report an issue, or ask a question.",
    type: "article",
  },
  alternates: {
    canonical: "https://freeunitconvertor.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-300">We&apos;d love to hear from you. Send us a message.</p>
        </header>

        <main className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea id="message" name="message" rows={6} placeholder="How can we help?" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">We respect your privacy. We won&apos;t share your details.</p>
              <button type="button" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Send Message</button>
            </div>
          </form>
        </main>

        <section className="max-w-4xl mx-auto mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Why Contact Free Unit Converter?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Our free online unit converter and developer tools are used worldwide by students, engineers, programmers, teachers, real estate professionals, and data scientists. Whether you need to convert <b>meters to feet</b>, <b>kilograms to pounds</b>, <b>Celsius to Fahrenheit</b>, <b>acres to square meters</b>, or format <b>JSON to CSV</b> for data analysis, we are here to support you.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            If you face issues such as tools not loading, want to request a new feature (e.g., a <b>currency converter</b> or <b>file format converter</b>), or need help with developer utilities like <b>Base64 encoding</b>, <b>Unix timestamp conversion</b>, or <b>JWT decoding</b>, please reach out to us. We value user feedback and constantly improve based on your suggestions.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            For quick help, explore our <a href="/faq" className="text-red-600 dark:text-red-400 hover:underline">Frequently Asked Questions</a>. You can also connect with us via email for specific queries. We respond to questions about unit conversions, developer tools, and site improvements as quickly as possible.
          </p>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freeunitconvertor.com/" },
              { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://freeunitconvertor.com/contact" }
            ]
          })
        }}
      />
    </div>
  );
}
