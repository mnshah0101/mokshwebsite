"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import VectorNormsDemo from "./VectorNormsDemo";
import SVDDemo from "./SVDDemo";
import QDADemo from "./QDADemo";
import SymmetricMatrixDemo from "./SymmetricMatrixDemo";
import CovarianceMatrixDemo from "./CovarianceMatrixDemo";
import GradientDescentDemo from "./GradientDescentDemo";
import ConvexityDemo from "./ConvexityDemo";
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
  },
  {
    id: "symmetric-matrices-quadratic-forms",
    title: "Symmetric Matrices and Quadratic Forms: From Linear Algebra to Statistics",
    excerpt: "Explore the deep connections between symmetric matrices, quadratic forms, eigendecomposition, and multivariate statistics through interactive visualizations.",
    content: `
      <h2>Introduction: The Bridge Between Linear Algebra and Statistics</h2>
      <p>Symmetric matrices are fundamental structures that appear throughout mathematics, from pure linear algebra to applied statistics. They provide the key to understanding quadratic forms, optimization landscapes, and the geometry of multivariate distributions. This article explores these connections through interactive visualizations.</p>
      
      <h3>What Makes a Matrix Symmetric?</h3>
      <p>A matrix <strong>A</strong> is symmetric if <strong>A = Aᵀ</strong>, meaning it equals its own transpose. In component form:</p>
      <p><strong>aᵢⱼ = aⱼᵢ</strong> for all i, j</p>
      
      <p>For a 2×2 matrix, this means:</p>
      <p><strong>A = [a  b]</strong></p>
      <p><strong>    [b  d]</strong></p>
      
      <h3>Quadratic Forms: The Heart of the Matter</h3>
      <p>A quadratic form is a polynomial where each term has degree 2:</p>
      <p><strong>Q(x, y) = ax² + 2bxy + dy²</strong></p>
      
      <p>This can be written in matrix form as:</p>
      <p><strong>Q(x) = xᵀAx</strong></p>
      
      <p>where <strong>x = [x, y]ᵀ</strong> and <strong>A = [a b; b d]</strong></p>
      
      <h3>The Power of Eigendecomposition</h3>
      <p>Every symmetric matrix can be diagonalized using its eigenvalues and eigenvectors:</p>
      <p><strong>A = QΛQᵀ</strong></p>
      
      <p>Where:</p>
      <ul>
        <li><strong>Q:</strong> Matrix of orthonormal eigenvectors (rotation)</li>
        <li><strong>Λ:</strong> Diagonal matrix of eigenvalues (scaling)</li>
        <li><strong>QQᵀ = I:</strong> Q is orthogonal</li>
      </ul>
      
      <h3>Geometric Interpretation</h3>
      <p>The eigendecomposition reveals the geometric structure of quadratic forms:</p>
      <ul>
        <li><strong>Eigenvectors:</strong> Principal axes of the elliptical contours</li>
        <li><strong>Eigenvalues:</strong> Scaling factors along each principal axis</li>
        <li><strong>Contour lines:</strong> Level sets of the quadratic form Q(x) = c</li>
      </ul>
      
      <div id="symmetric-matrix-demo"></div>
      
      <h3>Classification of Quadratic Forms</h3>
      <p>The eigenvalues determine the nature of the quadratic form:</p>
      
      <h4>Positive Definite (λ₁, λ₂ > 0)</h4>
      <ul>
        <li>All contours are ellipses centered at origin</li>
        <li>Function has global minimum at origin</li>
        <li>Example: x² + y² (identity matrix)</li>
      </ul>
      
      <h4>Negative Definite (λ₁, λ₂ < 0)</h4>
      <ul>
        <li>All contours are ellipses, function has maximum</li>
        <li>Function decreases in all directions from origin</li>
        <li>Example: -x² - y²</li>
      </ul>
      
      <h4>Indefinite (λ₁ > 0, λ₂ < 0 or vice versa)</h4>
      <ul>
        <li>Contours are hyperbolas</li>
        <li>Origin is a saddle point</li>
        <li>Example: x² - y²</li>
      </ul>
      
      <h4>Positive/Negative Semidefinite</h4>
      <ul>
        <li>One or more eigenvalues equal zero</li>
        <li>Degenerate case - function is constant along some directions</li>
      </ul>
      
      <h3>Principal Component Analysis Connection</h3>
      <p>The eigendecomposition of symmetric matrices is central to PCA:</p>
      <ul>
        <li><strong>Covariance matrix:</strong> Always symmetric</li>
        <li><strong>Principal components:</strong> Eigenvectors of covariance matrix</li>
        <li><strong>Explained variance:</strong> Eigenvalues show importance of each component</li>
      </ul>
      
      <h2>From Linear Algebra to Statistics: The Covariance Matrix</h2>
      
      <p>One of the most important applications of symmetric matrices in statistics is the covariance matrix of a multivariate random variable.</p>
      
      <h3>The Multivariate Gaussian Distribution</h3>
      <p>For a random vector <strong>X</strong> with mean <strong>μ</strong> and covariance matrix <strong>Σ</strong>, the probability density function is:</p>
      
      <p><strong>f(x) = (2π)^(-d/2) |Σ|^(-1/2) exp(-½(x-μ)ᵀΣ⁻¹(x-μ))</strong></p>
      
      <h3>The Covariance Matrix Structure</h3>
      <p>The covariance matrix <strong>Σ</strong> encodes all second-order statistics:</p>
      <p><strong>Σ = [Var(X₁)    Cov(X₁,X₂)]</strong></p>
      <p><strong>    [Cov(X₂,X₁) Var(X₂)  ]</strong></p>
      
      <p>Key properties:</p>
      <ul>
        <li><strong>Symmetric:</strong> Cov(X₁,X₂) = Cov(X₂,X₁)</li>
        <li><strong>Positive semidefinite:</strong> All eigenvalues ≥ 0</li>
        <li><strong>Diagonal elements:</strong> Variances (always positive)</li>
        <li><strong>Off-diagonal elements:</strong> Covariances (can be negative)</li>
      </ul>
      
      <h3>Geometric Interpretation of Covariance</h3>
      <p>The covariance matrix determines the shape and orientation of the data cloud:</p>
      
      <h4>Eigendecomposition of Covariance:</h4>
      <p><strong>Σ = QΛQᵀ</strong></p>
      
      <ul>
        <li><strong>Eigenvectors (Q):</strong> Principal directions of variation</li>
        <li><strong>Eigenvalues (Λ):</strong> Amount of variance in each direction</li>
        <li><strong>Confidence ellipses:</strong> Contours of constant Mahalanobis distance</li>
      </ul>
      
      <h3>Mahalanobis Distance</h3>
      <p>The quadratic form <strong>(x-μ)ᵀΣ⁻¹(x-μ)</strong> is the squared Mahalanobis distance, which:</p>
      <ul>
        <li>Accounts for different variances in each dimension</li>
        <li>Accounts for correlations between dimensions</li>
        <li>Reduces to Euclidean distance when Σ = I</li>
        <li>Follows a χ² distribution under the Gaussian assumption</li>
      </ul>
      
      <h3>Confidence Regions</h3>
      <p>For a d-dimensional Gaussian, the confidence region is defined by:</p>
      <p><strong>(x-μ)ᵀΣ⁻¹(x-μ) ≤ χ²ₐ(d)</strong></p>
      
      <p>Common confidence levels:</p>
      <ul>
        <li><strong>68%:</strong> χ²₀.₆₈(2) ≈ 2.28</li>
        <li><strong>95%:</strong> χ²₀.₉₅(2) ≈ 5.99</li>
        <li><strong>99%:</strong> χ²₀.₉₉(2) ≈ 9.21</li>
      </ul>
      
      <div id="covariance-matrix-demo"></div>
      
      <h3>Correlation vs Covariance</h3>
      <p>The correlation coefficient normalizes covariance:</p>
      <p><strong>ρ = Cov(X,Y) / (σₓσᵧ)</strong></p>
      
      <p>Properties:</p>
      <ul>
        <li><strong>Range:</strong> -1 ≤ ρ ≤ 1</li>
        <li><strong>ρ = 0:</strong> Uncorrelated (ellipses aligned with axes)</li>
        <li><strong>ρ > 0:</strong> Positive correlation (ellipses tilted ↗)</li>
        <li><strong>ρ < 0:</strong> Negative correlation (ellipses tilted ↖)</li>
        <li><strong>|ρ| → 1:</strong> Strong linear relationship (thin ellipses)</li>
      </ul>
      
      <h3>Applications in Machine Learning</h3>
      
      <h4>Gaussian Mixture Models</h4>
      <p>Each component has its own covariance matrix, allowing flexible cluster shapes.</p>
      
      <h4>Quadratic Discriminant Analysis (QDA)</h4>
      <p>Uses different covariance matrices for each class, creating quadratic decision boundaries.</p>
      
      <h4>Anomaly Detection</h4>
      <p>Points with large Mahalanobis distance are potential outliers.</p>
      
      <h4>Dimensionality Reduction</h4>
      <p>PCA uses eigendecomposition of covariance matrix to find low-dimensional representations.</p>
      
      <h3>Computational Considerations</h3>
      
      <h4>Numerical Stability</h4>
      <ul>
        <li><strong>Condition number:</strong> Ratio of largest to smallest eigenvalue</li>
        <li><strong>Regularization:</strong> Add λI to make matrix well-conditioned</li>
        <li><strong>Cholesky decomposition:</strong> Efficient for positive definite matrices</li>
      </ul>
      
      <h4>High-Dimensional Challenges</h4>
      <ul>
        <li><strong>Sample complexity:</strong> Need O(d²) samples to estimate Σ reliably</li>
        <li><strong>Curse of dimensionality:</strong> Gaussian assumption becomes harder to verify</li>
        <li><strong>Regularization techniques:</strong> Shrinkage, factor models, sparse covariance</li>
      </ul>
      
      <h3>Advanced Topics</h3>
      
      <h4>Matrix Calculus</h4>
      <p>Key derivatives involving quadratic forms:</p>
      <ul>
        <li><strong>∂(xᵀAx)/∂x = (A + Aᵀ)x = 2Ax</strong> (when A is symmetric)</li>
        <li><strong>∂(xᵀAx)/∂A = xxᵀ</strong></li>
      </ul>
      
      <h4>Optimization Connections</h4>
      <p>Quadratic forms appear in:</p>
      <ul>
        <li><strong>Least squares:</strong> ||Ax - b||² = (Ax-b)ᵀ(Ax-b)</li>
        <li><strong>Regularization:</strong> ||x||² = xᵀx</li>
        <li><strong>Trust regions:</strong> Constrained quadratic approximations</li>
      </ul>
      
      <h3>Summary: The Universal Language</h3>
      <p>Symmetric matrices and quadratic forms provide a universal language connecting:</p>
      <ul>
        <li><strong>Geometry:</strong> Ellipses, hyperboloids, and distance metrics</li>
        <li><strong>Optimization:</strong> Convex functions and critical point analysis</li>
        <li><strong>Statistics:</strong> Multivariate distributions and confidence regions</li>
        <li><strong>Machine Learning:</strong> Kernels, regularization, and dimensionality reduction</li>
      </ul>
      
      <p>Understanding these connections provides deep insight into the mathematical structures underlying many areas of data science and machine learning.</p>
    `,
    tags: ["mathematics", "linear algebra", "statistics", "matrices", "quadratic forms", "eigenvalues", "covariance", "gaussian"],
    date: "2025-01-21",
    interactive: true,
    category: "mathematics",
    author: "Moksh Shah",
    readTime: "15 min read",
    image: "/images/symmetric-matrices-preview.png",
    description: "Explore the fundamental connections between symmetric matrices, quadratic forms, eigendecomposition, and multivariate statistics through comprehensive mathematical exposition and interactive visualizations.",
    keywords: "symmetric matrices, quadratic forms, eigenvalues, eigenvectors, covariance matrix, multivariate gaussian, linear algebra, statistics, interactive visualization"
  },
  {
    id: "gradient-descent-newtons-method",
    title: "Gradient Descent vs Newton's Method: A Complete Guide to Multivariate Optimization",
    excerpt: "Master the mathematics behind gradient descent and Newton's method with interactive visualizations. Explore convexity, convergence rates, and practical implementation details.",
    content: `
      <h2>Introduction to Multivariate Optimization</h2>
      <p>Optimization is at the heart of machine learning, statistics, and engineering. When we want to find the minimum or maximum of a function, we need powerful algorithms that can navigate the landscape of possibilities efficiently. Two of the most fundamental and widely-used methods are <strong>Gradient Descent</strong> and <strong>Newton's Method</strong>.</p>
      
      <p>This article provides a comprehensive comparison of these methods, exploring their mathematical foundations, convergence properties, and practical applications through interactive visualizations.</p>
      
      <h2>Mathematical Foundations</h2>
      
      <h3>The Optimization Problem</h3>
      <p>Consider the general unconstrained optimization problem:</p>
      <p><strong>minimize f(x)</strong></p>
      <p>where <strong>x ∈ ℝⁿ</strong> and <strong>f: ℝⁿ → ℝ</strong> is a differentiable function.</p>
      
      <h3>First-Order Necessary Conditions</h3>
      <p>At a local minimum x*, the gradient must vanish:</p>
      <p><strong>∇f(x*) = 0</strong></p>
      
      <p>This gives us our target: find points where the gradient is zero.</p>
      
      <h2>Gradient Descent: The First-Order Method</h2>
      
      <h3>The Algorithm</h3>
      <p>Gradient descent uses only first-order information (the gradient) to iteratively update the current estimate:</p>
      
      <p><strong>x_{k+1} = x_k - α_k ∇f(x_k)</strong></p>
      
      <p>Where:</p>
      <ul>
        <li><strong>x_k:</strong> Current iterate</li>
        <li><strong>α_k:</strong> Step size (learning rate)</li>
        <li><strong>∇f(x_k):</strong> Gradient at current point</li>
      </ul>
      
      <h3>Geometric Interpretation</h3>
      <p>Gradient descent moves in the direction of <strong>steepest descent</strong>. The negative gradient -∇f(x) points in the direction of fastest decrease of the function at point x.</p>
      
      <h3>Step Size Selection</h3>
      <p>The choice of step size α is crucial:</p>
      <ul>
        <li><strong>Too small:</strong> Slow convergence</li>
        <li><strong>Too large:</strong> Oscillation or divergence</li>
        <li><strong>Adaptive methods:</strong> Line search, Armijo condition</li>
      </ul>
      
      <h3>Convergence Analysis</h3>
      <p>For strongly convex functions with Lipschitz gradients:</p>
      <ul>
        <li><strong>Linear convergence rate:</strong> O(ρᵏ) where ρ < 1</li>
        <li><strong>Rate depends on condition number:</strong> κ = L/μ</li>
        <li><strong>Optimal step size:</strong> α = 2/(L + μ)</li>
      </ul>
      
      <h2>Newton's Method: The Second-Order Approach</h2>
      
      <h3>The Algorithm</h3>
      <p>Newton's method uses second-order information (the Hessian matrix) for faster convergence:</p>
      
      <p><strong>x_{k+1} = x_k - H_k^{-1} ∇f(x_k)</strong></p>
      
      <p>Where <strong>H_k = ∇²f(x_k)</strong> is the Hessian matrix at x_k.</p>
      
      <h3>Derivation from Taylor Expansion</h3>
      <p>Newton's method comes from the second-order Taylor approximation:</p>
      <p><strong>f(x_k + Δx) ≈ f(x_k) + ∇f(x_k)ᵀΔx + ½ΔxᵀH_kΔx</strong></p>
      
      <p>Setting the gradient of this approximation to zero:</p>
      <p><strong>∇f(x_k) + H_kΔx = 0</strong></p>
      
      <p>Solving for Δx gives the Newton step: <strong>Δx = -H_k^{-1}∇f(x_k)</strong></p>
      
      <h3>Geometric Interpretation</h3>
      <p>Newton's method fits a quadratic approximation to the function at each iteration and jumps to the minimum of this approximation.</p>
      
      <h3>Convergence Properties</h3>
      <ul>
        <li><strong>Quadratic convergence:</strong> Near the solution, Newton's method converges quadratically</li>
        <li><strong>Affine invariance:</strong> Performance doesn't depend on coordinate system</li>
        <li><strong>Exact for quadratics:</strong> Converges in one step for quadratic functions</li>
      </ul>
      
      <h2>The Role of Convexity</h2>
      
      <h3>What is Convexity?</h3>
      <p>A function f is <strong>convex</strong> if for all x, y in its domain and λ ∈ [0,1]:</p>
      <p><strong>f(λx + (1-λ)y) ≤ λf(x) + (1-λ)f(y)</strong></p>
      
      <h3>Convex Sets</h3>
      <p>A set C is convex if the line segment between any two points in C lies entirely within C:</p>
      <p><strong>x, y ∈ C ⟹ λx + (1-λ)y ∈ C for all λ ∈ [0,1]</strong></p>
      
      <h3>Properties of Convex Functions</h3>
      <ul>
        <li><strong>Local minima are global:</strong> Any local minimum is a global minimum</li>
        <li><strong>First-order condition:</strong> x* is optimal iff ∇f(x*) = 0</li>
        <li><strong>Second-order condition:</strong> f is convex iff Hessian is positive semidefinite</li>
      </ul>
      
      <h3>Strictly Convex Functions</h3>
      <p>A function is <strong>strictly convex</strong> if the inequality is strict for x ≠ y. This ensures:</p>
      <ul>
        <li><strong>Unique global minimum</strong></li>
        <li><strong>Strong convergence guarantees</strong></li>
        <li><strong>Better conditioning</strong></li>
      </ul>
      
      <h3>Strongly Convex Functions</h3>
      <p>A function f is <strong>μ-strongly convex</strong> if:</p>
      <p><strong>f(y) ≥ f(x) + ∇f(x)ᵀ(y-x) + (μ/2)||y-x||²</strong></p>
      
      <p>This provides:</p>
      <ul>
        <li><strong>Lower bound on curvature</strong></li>
        <li><strong>Linear convergence rates for gradient descent</strong></li>
        <li><strong>Condition number bounds</strong></li>
      </ul>
      
      <div id="convexity-demo"></div>
      
      <h2>Comparative Analysis</h2>
      
      <h3>Convergence Rates</h3>
      <div class="comparison-table">
        <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
          <tr>
            <th style="padding: 8px; background-color: #f5f5f5;">Method</th>
            <th style="padding: 8px; background-color: #f5f5f5;">Convergence Rate</th>
            <th style="padding: 8px; background-color: #f5f5f5;">Information Used</th>
            <th style="padding: 8px; background-color: #f5f5f5;">Cost per Iteration</th>
          </tr>
          <tr>
            <td style="padding: 8px;">Gradient Descent</td>
            <td style="padding: 8px;">Linear: O(ρᵏ)</td>
            <td style="padding: 8px;">First-order (gradient)</td>
            <td style="padding: 8px;">O(n)</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Newton's Method</td>
            <td style="padding: 8px;">Quadratic: O(ρᵏ²)</td>
            <td style="padding: 8px;">Second-order (Hessian)</td>
            <td style="padding: 8px;">O(n³)</td>
          </tr>
        </table>
      </div>
      
      <h3>Advantages and Disadvantages</h3>
      
      <h4>Gradient Descent</h4>
      <p><strong>Advantages:</strong></p>
      <ul>
        <li>Simple to implement and understand</li>
        <li>Low computational cost per iteration</li>
        <li>Scales well to high dimensions</li>
        <li>Memory efficient</li>
        <li>Works for non-smooth functions (subgradient methods)</li>
      </ul>
      
      <p><strong>Disadvantages:</strong></p>
      <ul>
        <li>Slow convergence, especially for ill-conditioned problems</li>
        <li>Sensitive to step size selection</li>
        <li>Can be slow near the optimum</li>
        <li>Performance depends on problem conditioning</li>
      </ul>
      
      <h4>Newton's Method</h4>
      <p><strong>Advantages:</strong></p>
      <ul>
        <li>Fast quadratic convergence near the solution</li>
        <li>Affine invariant (doesn't depend on coordinate scaling)</li>
        <li>Automatic step size (no tuning needed)</li>
        <li>Excellent for well-conditioned problems</li>
      </ul>
      
      <p><strong>Disadvantages:</strong></p>
      <ul>
        <li>Expensive: requires Hessian computation and inversion</li>
        <li>O(n³) cost per iteration</li>
        <li>May not converge if started far from solution</li>
        <li>Requires positive definite Hessian</li>
        <li>Not suitable for very high-dimensional problems</li>
      </ul>
      
      <div id="gradient-descent-demo"></div>
      
      <h2>Practical Considerations</h2>
      
      <h3>When to Use Gradient Descent</h3>
      <ul>
        <li><strong>High-dimensional problems:</strong> n > 1000</li>
        <li><strong>Large-scale machine learning:</strong> Deep learning, online learning</li>
        <li><strong>Non-smooth objectives:</strong> L1 regularization, hinge loss</li>
        <li><strong>Memory-constrained environments</strong></li>
        <li><strong>Stochastic settings:</strong> SGD variants</li>
      </ul>
      
      <h3>When to Use Newton's Method</h3>
      <ul>
        <li><strong>Low to medium dimensions:</strong> n < 1000</li>
        <li><strong>High-precision solutions needed</strong></li>
        <li><strong>Well-conditioned problems</strong></li>
        <li><strong>Smooth, twice-differentiable objectives</strong></li>
        <li><strong>Logistic regression, GLMs</strong></li>
      </ul>
      
      <h3>Hybrid Approaches</h3>
      
      <h4>Quasi-Newton Methods</h4>
      <p>Combine advantages of both approaches:</p>
      <ul>
        <li><strong>BFGS:</strong> Approximates Hessian using gradient information</li>
        <li><strong>L-BFGS:</strong> Limited-memory version for large-scale problems</li>
        <li><strong>DFP:</strong> Davidon-Fletcher-Powell formula</li>
      </ul>
      
      <h4>Trust Region Methods</h4>
      <p>Combine local quadratic models with global convergence guarantees:</p>
      <ul>
        <li>Restrict steps to a "trust region" where the model is reliable</li>
        <li>Adjust trust region size based on model quality</li>
        <li>Guarantee global convergence</li>
      </ul>
      
      <h2>Implementation Details</h2>
      
      <h3>Gradient Descent Variants</h3>
      
      <h4>Momentum</h4>
      <p>Accelerates convergence by accumulating past gradients:</p>
      <p><strong>v_{k+1} = βv_k - α∇f(x_k)</strong></p>
      <p><strong>x_{k+1} = x_k + v_{k+1}</strong></p>
      
      <h4>Adaptive Methods</h4>
      <ul>
        <li><strong>AdaGrad:</strong> Adapts learning rate based on historical gradients</li>
        <li><strong>Adam:</strong> Combines momentum with adaptive learning rates</li>
        <li><strong>RMSprop:</strong> Uses exponential moving average of squared gradients</li>
      </ul>
      
      <h3>Newton's Method Modifications</h3>
      
      <h4>Damped Newton</h4>
      <p>Add line search to ensure global convergence:</p>
      <p><strong>x_{k+1} = x_k - α_k H_k^{-1} ∇f(x_k)</strong></p>
      
      <h4>Regularized Newton</h4>
      <p>Handle indefinite Hessians:</p>
      <p><strong>x_{k+1} = x_k - (H_k + λI)^{-1} ∇f(x_k)</strong></p>
      
      <h3>Numerical Considerations</h3>
      
      <h4>Gradient Computation</h4>
      <ul>
        <li><strong>Analytical gradients:</strong> Most accurate, when available</li>
        <li><strong>Finite differences:</strong> ∇f(x) ≈ (f(x+h) - f(x))/h</li>
        <li><strong>Automatic differentiation:</strong> Efficient and accurate</li>
      </ul>
      
      <h4>Hessian Computation</h4>
      <ul>
        <li><strong>Analytical Hessian:</strong> Exact but expensive to derive</li>
        <li><strong>Finite differences:</strong> Approximate using gradients</li>
        <li><strong>Gauss-Newton approximation:</strong> For least squares problems</li>
      </ul>
      
      <h2>Applications in Machine Learning</h2>
      
      <h3>Linear Regression</h3>
      <p>Objective: <strong>f(w) = ½||Xw - y||²</strong></p>
      <ul>
        <li><strong>Gradient:</strong> ∇f(w) = Xᵀ(Xw - y)</li>
        <li><strong>Hessian:</strong> H = XᵀX</li>
        <li><strong>Newton's method:</strong> w = (XᵀX)^{-1}Xᵀy (closed form!)</li>
      </ul>
      
      <h3>Logistic Regression</h3>
      <p>Objective: <strong>f(w) = Σᵢ log(1 + exp(-yᵢwᵀxᵢ))</strong></p>
      <ul>
        <li><strong>Gradient:</strong> Involves sigmoid functions</li>
        <li><strong>Hessian:</strong> Always positive semidefinite</li>
        <li><strong>Newton's method:</strong> Often called IRLS (Iteratively Reweighted Least Squares)</li>
      </ul>
      
      <h3>Neural Networks</h3>
      <ul>
        <li><strong>Gradient descent:</strong> Backpropagation for gradient computation</li>
        <li><strong>Variants:</strong> SGD, Adam, RMSprop for large-scale optimization</li>
        <li><strong>Second-order methods:</strong> Rarely used due to computational cost</li>
      </ul>
      
      <h2>Advanced Topics</h2>
      
      <h3>Stochastic Methods</h3>
      <p>For large datasets, use stochastic approximations:</p>
      <ul>
        <li><strong>SGD:</strong> Use single sample or mini-batch</li>
        <li><strong>Stochastic Newton:</strong> Approximate Hessian with samples</li>
        <li><strong>Variance reduction:</strong> SVRG, SAGA methods</li>
      </ul>
      
      <h3>Constrained Optimization</h3>
      <p>Extend to problems with constraints:</p>
      <ul>
        <li><strong>Projected gradient descent:</strong> Project onto feasible set</li>
        <li><strong>Lagrange multipliers:</strong> Handle equality constraints</li>
        <li><strong>Interior point methods:</strong> Handle inequality constraints</li>
      </ul>
      
      <h3>Non-Convex Optimization</h3>
      <p>Special considerations for non-convex functions:</p>
      <ul>
        <li><strong>Multiple local minima:</strong> Global optimization challenges</li>
        <li><strong>Saddle points:</strong> Can slow convergence</li>
        <li><strong>Escape strategies:</strong> Random restarts, annealing</li>
      </ul>
      
      <h2>Summary and Recommendations</h2>
      
      <h3>Key Takeaways</h3>
      <ul>
        <li><strong>Gradient descent:</strong> Simple, scalable, but potentially slow</li>
        <li><strong>Newton's method:</strong> Fast convergence, but expensive and limited scalability</li>
        <li><strong>Convexity matters:</strong> Provides convergence guarantees and global optimality</li>
        <li><strong>Problem structure:</strong> Choose method based on dimension, conditioning, and resources</li>
      </ul>
      
      <h3>Decision Framework</h3>
      <ol>
        <li><strong>Problem size:</strong> High-dimensional → Gradient descent</li>
        <li><strong>Computational budget:</strong> Limited → Gradient descent</li>
        <li><strong>Convergence speed:</strong> Critical → Newton's method (if feasible)</li>
        <li><strong>Problem conditioning:</strong> Well-conditioned → Newton's method</li>
        <li><strong>Smoothness:</strong> Non-smooth → Subgradient methods</li>
      </ol>
      
      <h3>Modern Developments</h3>
      <ul>
        <li><strong>Acceleration:</strong> Nesterov momentum, accelerated gradient methods</li>
        <li><strong>Adaptive methods:</strong> Adam, AdaGrad family</li>
        <li><strong>Second-order approximations:</strong> K-FAC, natural gradients</li>
        <li><strong>Distributed optimization:</strong> Parallel and federated learning</li>
      </ul>
      
      <p>Understanding these fundamental optimization methods provides the foundation for tackling complex machine learning and engineering problems. The choice between gradient descent and Newton's method—or their variants—depends on the specific characteristics of your problem and computational constraints.</p>
    `,
    tags: ["optimization", "machine learning", "mathematics", "gradient descent", "newtons method", "convexity", "interactive"],
    date: "2025-01-23",
    interactive: true,
    category: "mathematics",
    author: "Moksh Shah",
    readTime: "18 min read",
    image: "/images/optimization-preview.png",
    description: "Master the mathematics behind gradient descent and Newton's method with interactive visualizations. Explore convexity, convergence rates, and practical implementation details through comprehensive mathematical exposition.",
    keywords: "gradient descent, newtons method, optimization, machine learning, convexity, convergence, hessian, interactive visualization, multivariate optimization"
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
        
        {article.interactive && article.id === "symmetric-matrices-quadratic-forms" && (
          <div className="mt-12 space-y-12">
            <SymmetricMatrixDemo />
            <CovarianceMatrixDemo />
          </div>
        )}
        
        {article.interactive && article.id === "gradient-descent-newtons-method" && (
          <div className="mt-12 space-y-12">
            <GradientDescentDemo />
            <ConvexityDemo />
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