import Script from "next/script";

interface ArticleStructuredDataProps {
  article: {
    id: string;
    title: string;
    description: string;
    author: string;
    date: string;
    image?: string;
    tags: string[];
    readTime: string;
  };
}

export default function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://moksh.dev";
  const articleUrl = `${baseUrl}/articles/${article.id}`;
  const imageUrl = article.image ? `${baseUrl}${article.image}` : `${baseUrl}/images/moksh_logo.png`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: article.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Moksh Shah",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/moksh_logo.png`,
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    keywords: article.tags.join(", "),
    articleSection: "Mathematics",
    wordCount: article.description.length,
    timeRequired: article.readTime,
  };

  return (
    <Script
      id="article-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 