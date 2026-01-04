import { Metadata } from "next";
import ArticleClient from "../../../components/ArticleClient";

// Sample articles data for metadata generation
const sampleArticles: Array<{
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  interactive: boolean;
  category: string;
  author: string;
  readTime: string;
  image: string;
  description: string;
  keywords: string;
}> = [
  {
    id: "esl-chapter-2-solutions",
    title: "ESL Chapter 2: Selected Problem Solutions",
    excerpt: "My solutions to selected problems from Chapter 2 of The Elements of Statistical Learning. Covers problems 2.1, 2.2, 2.4, 2.5, and 2.7.",
    tags: ["statistics", "machine learning", "ESL", "textbook solutions"],
    date: "2026-01-04",
    interactive: false,
    category: "notes",
    author: "Moksh Shah",
    readTime: "2 min read",
    image: "/images/moksh_logo.png",
    description: "Solutions to selected problems from Chapter 2 of The Elements of Statistical Learning by Hastie, Tibshirani, and Friedman.",
    keywords: "ESL, Elements of Statistical Learning, Chapter 2, solutions, statistics, machine learning, Hastie, Tibshirani, Friedman"
  }
];

// Generate metadata for the article
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = sampleArticles.find(a => a.id === params.id);
  
  if (!article) {
    return {
      title: "Article Not Found | Moksh Shah",
      description: "The requested article could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://moksh.dev";
  const articleUrl = `${baseUrl}/articles/${article.id}`;
  const imageUrl = article.image ? `${baseUrl}${article.image}` : `${baseUrl}/images/moksh_logo.png`;

  return {
    title: `${article.title} | Moksh Shah`,
    description: article.description || article.excerpt,
    keywords: article.keywords,
    authors: [{ name: article.author || "Moksh Shah" }],
    openGraph: {
      title: article.title,
      description: article.description || article.excerpt,
      url: articleUrl,
      siteName: "Moksh Shah",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "Moksh Shah"],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description || article.excerpt,
      images: [imageUrl],
      creator: "@mnshah0101",
    },
    alternates: {
      canonical: articleUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function ArticlePage() {
  return (
    <main className="bg-white mx-4 md:mx-12 px-4 md:px-12">
      <ArticleClient />
    </main>
  );
} 