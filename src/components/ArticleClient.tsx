"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ArticleStructuredData from "./ArticleStructuredData";

// Sample articles data - you can replace this with your actual articles
const sampleArticles: Array<{
  id: string;
  title: string;
  excerpt: string;
  content: string;
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
    content: `
      <h2>Chapter 2: Overview of Supervised Learning</h2>
      <p>These are my solutions to selected problems from Chapter 2 of <em>The Elements of Statistical Learning</em> by Hastie, Tibshirani, and Friedman.</p>

      <h3>Problems Covered</h3>
      <ul>
        <li><strong>Problem 2.1</strong></li>
        <li><strong>Problem 2.2</strong></li>
        <li><strong>Problem 2.4</strong></li>
        <li><strong>Problem 2.5</strong></li>
        <li><strong>Problem 2.7</strong></li>
      </ul>

      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; margin: 1.5rem 0; border-radius: 0.25rem;">
        <strong>Note:</strong> These solutions are approximate and not fully detailed. They represent my own work and understanding—use them as a reference, not as definitive answers.
      </div>

      <h3>Download</h3>
      <p>
        <a href="https://drive.google.com/file/d/1ObrUip1H5KlIxo84Li7boD8VbhdlQhMA/view?usp=sharing" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #3b82f6; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: bold;">
          View Solutions PDF →
        </a>
      </p>
    `,
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

export default function ArticleClient() {
  const params = useParams();
  const articleId = params.id as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundArticle = sampleArticles.find(a => a.id === articleId);
    setArticle(foundArticle);
    setLoading(false);
  }, [articleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="lucida text-lg">loading...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl lucida-bold mb-4">article not found</h1>
          <Link href="/articles" className="text-blue-600 lucida hover:underline">
            ← back to articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ArticleStructuredData article={article} />
      <div className="max-w-4xl mx-auto py-8">
        {/* Navigation */}
        <div className="flex items-center mb-8">
          <Link href="/articles" className="text-xl lucida-bold hover:underline">
            ← back to articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-gray-500 lucida">{article.category}</span>
            {article.interactive && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded lucida">
                interactive
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl lucida-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center justify-between text-sm text-gray-500 lucida">
            <div className="flex gap-2">
              {article.tags.map((tag: string) => (
                <span key={tag} className="text-xs text-gray-500">
                  #{tag}
                </span>
              ))}
            </div>
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="lucida leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* Interactive Content */}

        {/* Navigation Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link href="/articles" className="text-blue-600 lucida hover:underline">
              ← all articles
            </Link>
            <div className="text-sm text-gray-500 lucida">
              share this article
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 