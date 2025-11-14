import BlogListPageClient from "@/components/BlogListPageClient";
import blogData from "@/data/blog-posts.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Unit Conversion Tips, Tools & Guides | Unit Converter",
  description: "Expert guides on unit conversion, measurement tips, engineering calculations, and developer tools. Learn best practices for accurate conversions and efficient workflows.",
  keywords: "unit conversion blog, measurement guides, engineering tips, developer tools blog, conversion tutorials, measurement best practices",
  openGraph: {
    title: "Blog - Unit Conversion Tips, Tools & Guides",
    description: "Expert guides on unit conversion, measurement tips, engineering calculations, and developer tools.",
    type: "website",
  },
  alternates: {
    canonical: 'https://freeunitconvertor.com/blog',
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Unit Converter Blog",
      url: "https://freeunitconvertor.com/blog",
      description: "Expert guides on unit conversion, measurement tips, and developer tools",
      publisher: {
        "@type": "Organization",
        name: "Unit Converter",
        url: "https://freeunitconvertor.com"
      }
    })
  }
};

export default function BlogPage() {
  const { posts } = blogData;

  return <BlogListPageClient posts={posts} />;
}