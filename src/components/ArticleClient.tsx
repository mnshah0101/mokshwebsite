"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import VectorNormsDemo from "./VectorNormsDemo";
import SVDDemo from "./SVDDemo";
import ArticleStructuredData from "./ArticleStructuredData";

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
    content: `
      <h2>Understanding Hard Margin SVM</h2>
      <p>Support Vector Machines (SVM) are powerful supervised learning algorithms used for classification and regression. The hard margin SVM assumes that the data is linearly separable and finds the optimal hyperplane that maximizes the margin between classes.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Decision Boundary:</strong> The hyperplane that separates the two classes</li>
        <li><strong>Margin:</strong> The distance between the decision boundary and the nearest data points</li>
        <li><strong>Support Vectors:</strong> The data points closest to the decision boundary</li>
        <li><strong>Hard Margin:</strong> No data points are allowed within the margin</li>
      </ul>
      
      <h3>Mathematical Formulation</h3>
      <p>For a 2D case, the decision boundary is defined by:</p>
      <p><strong>w₁x + w₂y + b = 0</strong></p>
      <p>Where:</p>
      <ul>
        <li><strong>w = (w₁, w₂):</strong> Weight vector (normal to the decision boundary)</li>
        <li><strong>b:</strong> Bias term</li>
        <li><strong>Margin width:</strong> 2/||w||</li>
      </ul>
      
      <h3>Optimization Problem</h3>
      <p>The SVM optimization problem is:</p>
      <p><strong>Minimize:</strong> ½||w||²</p>
      <p><strong>Subject to:</strong> yᵢ(w·xᵢ + b) ≥ 1 for all training points</p>
      
      <h3>Geometric Interpretation</h3>
      <p>The SVM finds the widest possible "street" between the two classes. The decision boundary runs down the middle of this street, and the margin boundaries define the edges.</p>
    `,
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
        {article.interactive && article.id === "vector-norms-visualization" && (
          <div className="mt-12">
            <VectorNormsDemo />
          </div>
        )}
        
        {article.interactive && article.id === "hard-margin-svm" && (
          <div className="mt-12">
            <SVDDemo />
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
    </>
  );
} 