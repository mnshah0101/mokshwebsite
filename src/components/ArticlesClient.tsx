"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Sample articles data - you can replace this with your actual articles
const sampleArticles = [
  {
    id: "vector-norms-visualization",
    title: "Visualizing Vector Norms: L0, L1, L2, and L∞",
    excerpt: "An interactive exploration of different vector norms and their geometric interpretations, with real-time visualizations of unit balls.",
    tags: ["mathematics", "linear algebra", "vector norms", "visualization"],
    date: "2025-07-12",
    interactive: true,
    category: "mathematics"
  },
  {
    id: "hard-margin-svm",
    title: "Interactive Hard Margin SVM",
    excerpt: "Explore Support Vector Machines with hard margins through an interactive visualization. Drag points and see how the decision boundary and margins adapt in real-time.",
    tags: ["machine learning", "svm", "classification", "interactive"],
    date: "2025-01-15",
    interactive: true,
    category: "machine learning"
  }
];

export default function ArticlesClient() {
  const [articles, setArticles] = useState(sampleArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique categories and tags
  const categories = ["all", ...Array.from(new Set(sampleArticles.map(article => article.category)))];
  const allTags = sampleArticles.flatMap(article => article.tags);
  const uniqueTags = Array.from(new Set(allTags));

  // Filter articles based on search term, category, and tags
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => article.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="header w-full py-8">
      <div className="flex items-center mb-8">
        <Link href="/" className="text-xl lucida-bold hover:underline">
          ← back to home
        </Link>
      </div>
      
      <h1 className="text-3xl md:text-4xl lucida-bold mb-8">articles</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lucida"
          />
          <div className="absolute right-3 top-3 text-gray-400">
            🔍
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm lucida ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2">
          {uniqueTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs lucida ${
                selectedTags.includes(tag)
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 lucida text-gray-600">
        {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map(article => (
          <article
            key={article.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 lucida">{article.category}</span>
              {article.interactive && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded lucida">
                  interactive
                </span>
              )}
            </div>
            
            <h2 className="text-xl lucida-bold mb-3 hover:text-blue-600 transition-colors">
              <Link href={`/articles/${article.id}`}>
                {article.title}
              </Link>
            </h2>
            
            <p className="text-gray-600 mb-4 lucida text-sm leading-relaxed">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs text-gray-500 lucida">
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-400 lucida">
                {new Date(article.date).toLocaleDateString()}
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 lucida text-lg">
            no articles found matching your criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedTags([]);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg lucida hover:bg-blue-600 transition-colors"
          >
            clear filters
          </button>
        </div>
      )}
    </div>
  );
} 