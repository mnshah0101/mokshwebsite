"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import VectorNormsDemo from "../../../components/VectorNormsDemo";

// Sample articles data - you can replace this with your actual articles
const sampleArticles = [
  {
    id: "vector-norms-visualization",
    title: "Visualizing Vector Norms: L0, L1, L2, and L∞",
    excerpt: "An interactive exploration of different vector norms and their geometric interpretations, with real-time visualizations of unit balls.",
    content: `
      <h2>Introduction to Vector Norms</h2>
      <p>A vector norm is a function that assigns a strictly positive length or size to each vector in a vector space. Different norms give different geometric interpretations of "distance" and "size" in vector spaces.</p>
      
      <h3>The Four Main Norms</h3>
      <ul>
        <li><strong>L0 Norm (Hamming Norm)</strong>: Counts the number of non-zero elements in a vector</li>
        <li><strong>L1 Norm (Manhattan Norm)</strong>: Sum of absolute values of vector components</li>
        <li><strong>L2 Norm (Euclidean Norm)</strong>: Square root of sum of squared components</li>
        <li><strong>L∞ Norm (Chebyshev Norm)</strong>: Maximum absolute value among components</li>
      </ul>
      
      <h3>Mathematical Definitions</h3>
      <p>For a vector <strong>x = (x₁, x₂, ..., xₙ)</strong>:</p>
      <ul>
        <li><strong>L0:</strong> ||x||₀ = number of non-zero elements</li>
        <li><strong>L1:</strong> ||x||₁ = |x₁| + |x₂| + ... + |xₙ|</li>
        <li><strong>L2:</strong> ||x||₂ = √(x₁² + x₂² + ... + xₙ²)</li>
        <li><strong>L∞:</strong> ||x||∞ = max(|x₁|, |x₂|, ..., |xₙ|)</li>
      </ul>
      
      <h3>Geometric Interpretation</h3>
      <p>The unit ball for each norm is the set of all vectors with norm equal to 1. These shapes reveal the fundamental differences between the norms:</p>
      <ul>
        <li><strong>L0:</strong> Discrete points (not a true norm in continuous spaces)</li>
        <li><strong>L1:</strong> Diamond shape (rhombus)</li>
        <li><strong>L2:</strong> Circle (sphere in higher dimensions)</li>
        <li><strong>L∞:</strong> Square (cube in higher dimensions)</li>
      </ul>
      
      <div class="interactive-demo">
        <h4>Interactive: Vector Norm Visualization</h4>
        <p>Explore how different vector norms create different unit balls. The rotating vector shows the current norm values in real-time:</p>
        <div id="vector-norms-demo"></div>
      </div>
      
      <h3>Applications</h3>
      <p>Different norms are used in various applications:</p>
      <ul>
        <li><strong>L1:</strong> Sparse signal processing, LASSO regression</li>
        <li><strong>L2:</strong> Standard distance metric, least squares</li>
        <li><strong>L∞:</strong> Worst-case analysis, robust optimization</li>
        <li><strong>L0:</strong> Sparsity constraints, feature selection</li>
      </ul>
    `,
    tags: ["mathematics", "linear algebra", "vector norms", "visualization"],
    date: "2025-07-12",
    interactive: true,
    category: "mathematics"
  }
];

export default function ArticlePage() {
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
      <main className="bg-white mx-4 md:mx-12 px-4 md:px-12">
        <div className="flex items-center justify-center min-h-screen">
          <p className="lucida text-lg">loading...</p>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="bg-white mx-4 md:mx-12 px-4 md:px-12">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl lucida-bold mb-4">article not found</h1>
            <Link href="/articles" className="text-blue-600 lucida hover:underline">
              ← back to articles
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white mx-4 md:mx-12 px-4 md:px-12">
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
        {article.interactive && article.id === "vector-norms-visualization" && (
          <div className="mt-12">
            <VectorNormsDemo />
          </div>
        )}

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
    </main>
  );
} 