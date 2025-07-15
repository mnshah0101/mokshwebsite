import { Metadata } from "next";
import ArticleClient from "../../../components/ArticleClient";

// Sample articles data for metadata generation
const sampleArticles = [
  {
    id: "vector-norms-visualization",
    title: "Visualizing Vector Norms: L0, L1, L2, and L∞",
    excerpt: "An interactive exploration of different vector norms and their geometric interpretations, with real-time visualizations of unit balls.",
    tags: ["mathematics", "linear algebra", "vector norms", "visualization"],
    date: "2025-07-12",
    interactive: true,
    category: "mathematics",
    author: "Moksh Shah",
    readTime: "5 min read",
    image: "/images/vector-norms-preview.png",
    description: "Explore the fascinating world of vector norms through interactive visualizations. Learn about L0, L1, L2, and L∞ norms with real-time demonstrations and geometric interpretations.",
    keywords: "vector norms, linear algebra, mathematics, interactive visualization, L0 norm, L1 norm, L2 norm, L∞ norm, machine learning, data science"
  },
  {
    id: "hard-margin-svm",
    title: "Interactive Hard Margin SVM",
    excerpt: "Explore Support Vector Machines with hard margins through an interactive visualization. Drag points and see how the decision boundary and margins adapt in real-time.",
    tags: ["machine learning", "svm", "classification", "interactive"],
    date: "2025-01-15",
    interactive: true,
    category: "machine learning",
    author: "Moksh Shah",
    readTime: "7 min read",
    image: "/images/svm-preview.png",
    description: "Learn about Support Vector Machines through interactive visualization. Understand hard margins, decision boundaries, and support vectors with hands-on exploration.",
    keywords: "support vector machine, SVM, hard margin, classification, machine learning, decision boundary, margin, support vectors"
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