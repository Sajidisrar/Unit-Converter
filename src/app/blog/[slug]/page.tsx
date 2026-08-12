import BlogPostContent from "@/components/BlogPostContent";
import blogData from "@/data/blog-posts.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({ slug: post.id }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.posts.find(p => p.id === slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Unit Converter Blog`,
    description: post.excerpt,
    keywords: post.category,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
    alternates: {
      canonical: `https://freeunitconvertor.com/blog/${slug}`,
    },
    other: {
      'application/ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: {
          "@type": "Organization",
          name: "Unit Converter"
        },
        publisher: {
          "@type": "Organization",
          name: "Unit Converter",
          url: "https://freeunitconvertor.com"
        },
        datePublished: post.date || "2025-01-15",
        dateModified: post.dateModified || post.date || "2025-01-15",
        url: `https://freeunitconvertor.com/blog/${slug}`
      })
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogData.posts.find(p => p.id === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogData.posts
    .filter(p => p.id !== slug && p.category === post.category)
    .slice(0, 2);

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}
