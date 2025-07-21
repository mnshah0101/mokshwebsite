"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import VectorNormsDemo from "./VectorNormsDemo";
import SVDDemo from "./SVDDemo";
import QDADemo from "./QDADemo";
import SymmetricMatrixDemo from "./SymmetricMatrixDemo";
import CovarianceMatrixDemo from "./CovarianceMatrixDemo";
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