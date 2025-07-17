"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import VectorNormsDemo from "./VectorNormsDemo";
import SVDDemo from "./SVDDemo";
import QDADemo from "./QDADemo";
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
  },
  {
    id: "quadratic-discriminant-analysis",
    title: "Interactive Quadratic Discriminant Analysis (QDA)",
    excerpt: "Explore Quadratic Discriminant Analysis through mathematical derivations and interactive visualizations. Understand Gaussian models, covariance matrices, and quadratic decision boundaries.",
    content: `
      <h2>Introduction to Quadratic Discriminant Analysis</h2>
      <p>Quadratic Discriminant Analysis (QDA) is a powerful statistical classification method that extends Linear Discriminant Analysis (LDA) by allowing different covariance matrices for each class. This flexibility enables QDA to model more complex, non-linear decision boundaries.</p>
      
      <h3>Mathematical Foundation</h3>
      <p>QDA assumes that each class follows a multivariate Gaussian distribution with its own covariance matrix:</p>
      <p><strong>Class k:</strong> x | y = k ~ N(μₖ, Σₖ)</p>
      <p>Where:</p>
      <ul>
        <li><strong>μₖ:</strong> Mean vector for class k</li>
        <li><strong>Σₖ:</strong> Covariance matrix for class k (class-specific)</li>
        <li><strong>πₖ:</strong> Prior probability of class k</li>
      </ul>
      
      <h3>The Multivariate Gaussian Distribution</h3>
      <p>For a d-dimensional feature vector x, the multivariate Gaussian probability density function is:</p>
      <p><strong>p(x|μ, Σ) = (2π)^(-d/2) |Σ|^(-1/2) exp(-½(x-μ)ᵀΣ⁻¹(x-μ))</strong></p>
      <p>The exponent contains the <strong>Mahalanobis distance</strong>: (x-μ)ᵀΣ⁻¹(x-μ)</p>
      
      <h3>Bayes' Theorem and Classification</h3>
      <p>Using Bayes' theorem, the posterior probability of class k given observation x is:</p>
      <p><strong>P(y=k|x) = P(x|y=k)P(y=k) / P(x)</strong></p>
      <p>Where:</p>
      <ul>
        <li><strong>P(x|y=k):</strong> Likelihood (multivariate Gaussian)</li>
        <li><strong>P(y=k):</strong> Prior probability πₖ</li>
        <li><strong>P(x):</strong> Evidence (normalizing constant)</li>
      </ul>
      
      <h3>QDA Decision Function</h3>
      <p>Taking the logarithm of the posterior probabilities, the QDA decision function becomes:</p>
      <p><strong>δₖ(x) = -½(x-μₖ)ᵀΣₖ⁻¹(x-μₖ) - ½log|Σₖ| + log(πₖ)</strong></p>
      
      <h4>Components of the Decision Function:</h4>
      <ul>
        <li><strong>Quadratic term:</strong> -(x-μₖ)ᵀΣₖ⁻¹(x-μₖ) - measures distance from class mean</li>
        <li><strong>Covariance penalty:</strong> -½log|Σₖ| - penalizes high variance</li>
        <li><strong>Prior term:</strong> log(πₖ) - favors more frequent classes</li>
      </ul>
      
      <h3>Decision Boundary Mathematics</h3>
      <p>The decision boundary between classes i and j is defined by:</p>
      <p><strong>δᵢ(x) = δⱼ(x)</strong></p>
      <p>Expanding this equation:</p>
      <p><strong>-½(x-μᵢ)ᵀΣᵢ⁻¹(x-μᵢ) - ½log|Σᵢ| + log(πᵢ) = -½(x-μⱼ)ᵀΣⱼ⁻¹(x-μⱼ) - ½log|Σⱼ| + log(πⱼ)</strong></p>
      
      <h4>Why Quadratic?</h4>
      <p>The decision boundary is quadratic because:</p>
      <ul>
        <li>Each class has its own covariance matrix Σₖ</li>
        <li>The quadratic form (x-μₖ)ᵀΣₖ⁻¹(x-μₖ) creates elliptical contours</li>
        <li>Different Σₖ values create different ellipse shapes and orientations</li>
        <li>The boundary is the intersection of these elliptical regions</li>
      </ul>
      
      <h3>Parameter Estimation</h3>
      <p>Given training data, QDA parameters are estimated using maximum likelihood:</p>
      
      <h4>Prior Probabilities:</h4>
      <p><strong>π̂ₖ = nₖ / n</strong> (fraction of samples in class k)</p>
      
      <h4>Mean Vectors:</h4>
      <p><strong>μ̂ₖ = (1/nₖ) Σᵢ:yᵢ=k xᵢ</strong> (sample mean for class k)</p>
      
      <h4>Covariance Matrices:</h4>
      <p><strong>Σ̂ₖ = (1/(nₖ-1)) Σᵢ:yᵢ=k (xᵢ-μ̂ₖ)(xᵢ-μ̂ₖ)ᵀ</strong></p>
      
      <h3>QDA vs LDA: Key Differences</h3>
      <div class="comparison-table">
        <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr>
            <th style="padding: 8px; background-color: #f5f5f5;">Aspect</th>
            <th style="padding: 8px; background-color: #f5f5f5;">LDA</th>
            <th style="padding: 8px; background-color: #f5f5f5;">QDA</th>
          </tr>
          <tr>
            <td style="padding: 8px;">Covariance</td>
            <td style="padding: 8px;">Shared: Σ₁ = Σ₂ = Σ</td>
            <td style="padding: 8px;">Separate: Σ₁ ≠ Σ₂</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Decision Boundary</td>
            <td style="padding: 8px;">Linear hyperplane</td>
            <td style="padding: 8px;">Quadratic curve</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Parameters</td>
            <td style="padding: 8px;">O(d²) + O(d×k)</td>
            <td style="padding: 8px;">O(d²×k)</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Flexibility</td>
            <td style="padding: 8px;">Less flexible</td>
            <td style="padding: 8px;">More flexible</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Overfitting Risk</td>
            <td style="padding: 8px;">Lower</td>
            <td style="padding: 8px;">Higher</td>
          </tr>
        </table>
      </div>
      
      <h3>Geometric Interpretation</h3>
      <p>QDA creates <strong>confidence ellipses</strong> for each class:</p>
      <ul>
        <li><strong>Shape:</strong> Determined by eigenvalues of Σₖ</li>
        <li><strong>Orientation:</strong> Determined by eigenvectors of Σₖ</li>
        <li><strong>Size:</strong> Scaled by confidence level (e.g., 95%)</li>
        <li><strong>Center:</strong> Located at class mean μₖ</li>
      </ul>
      
      <h3>Eigendecomposition and Ellipses</h3>
      <p>For covariance matrix Σₖ = QΛQᵀ:</p>
      <ul>
        <li><strong>Q:</strong> Eigenvector matrix (rotation)</li>
        <li><strong>Λ:</strong> Eigenvalue matrix (scaling)</li>
        <li><strong>Semi-axes:</strong> √(χ²₀.₀₅ × λᵢ) for 95% confidence</li>
      </ul>
      
      <h3>Applications and Use Cases</h3>
      <ul>
        <li><strong>Medical diagnosis:</strong> Different symptom patterns for diseases</li>
        <li><strong>Finance:</strong> Risk assessment with varying volatility</li>
        <li><strong>Pattern recognition:</strong> Non-linear feature relationships</li>
        <li><strong>Quality control:</strong> Manufacturing process monitoring</li>
      </ul>
      
      <h3>Assumptions and Limitations</h3>
      <ul>
        <li><strong>Gaussian assumption:</strong> Each class follows multivariate normal distribution</li>
        <li><strong>Independence:</strong> Features should be conditionally independent given class</li>
        <li><strong>Sample size:</strong> Needs sufficient data to estimate covariance matrices</li>
        <li><strong>Curse of dimensionality:</strong> Performance degrades with high dimensions</li>
      </ul>
      
     
      
      <h3>Advanced Topics</h3>
      
      <h4>Regularized QDA</h4>
      <p>To prevent overfitting, regularization can be applied:</p>
      <p><strong>Σ̂ₖ(α) = (1-α)Σ̂ₖ + αΣ̂pooled</strong></p>
      <p>Where α ∈ [0,1] controls the trade-off between QDA (α=0) and LDA (α=1).</p>
      
      <h4>Computational Complexity</h4>
      <ul>
        <li><strong>Training:</strong> O(nd² + kd³) - matrix operations dominate</li>
        <li><strong>Prediction:</strong> O(d²) per sample - matrix-vector products</li>
        <li><strong>Storage:</strong> O(kd²) - k covariance matrices</li>
      </ul>
      
      <h4>Numerical Stability</h4>
      <p>Key considerations for implementation:</p>
      <ul>
        <li><strong>Singular matrices:</strong> Add regularization ε·I to Σₖ</li>
        <li><strong>Log-space computation:</strong> Avoid overflow in exponentials</li>
        <li><strong>Cholesky decomposition:</strong> Efficient matrix inversion</li>
      </ul>
    `,
    tags: ["machine learning", "qda", "classification", "gaussian", "statistics", "interactive"],
    date: "2025-01-17",
    interactive: true,
    category: "machine learning",
    author: "Moksh Shah",
    readTime: "12 min read",
    image: "/images/qda-preview.png",
    description: "Master Quadratic Discriminant Analysis through comprehensive mathematical exposition and interactive visualization. Understand Gaussian models, covariance matrices, and quadratic decision boundaries with hands-on exploration.",
    keywords: "quadratic discriminant analysis, QDA, classification, machine learning, gaussian distribution, covariance matrix, decision boundary, bayes theorem, multivariate statistics"
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
        
        {article.interactive && article.id === "quadratic-discriminant-analysis" && (
          <div className="mt-12">
            <QDADemo />
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