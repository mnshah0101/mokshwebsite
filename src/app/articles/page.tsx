import { Metadata } from "next";
import ArticlesClient from "../../components/ArticlesClient";

// Generate metadata for the articles page
export const metadata: Metadata = {
  title: "Articles | Moksh Shah",
  description: "Explore interactive articles about mathematics, machine learning, and computer science. Learn about vector norms, algorithms, and more through hands-on visualizations.",
  keywords: "articles, mathematics, machine learning, computer science, interactive, vector norms, algorithms, education",
  openGraph: {
    title: "Articles | Moksh Shah",
    description: "Explore interactive articles about mathematics, machine learning, and computer science. Learn about vector norms, algorithms, and more through hands-on visualizations.",
    url: "https://moksh.dev/articles",
    siteName: "Moksh Shah",
    images: [
      {
        url: "https://moksh.dev/images/moksh_logo.png",
        width: 1200,
        height: 630,
        alt: "Moksh Shah Articles",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles | Moksh Shah",
    description: "Explore interactive articles about mathematics, machine learning, and computer science.",
    images: ["https://moksh.dev/images/moksh_logo.png"],
    creator: "@mnshah0101",
  },
  alternates: {
    canonical: "https://moksh.dev/articles",
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

export default function ArticlesPage() {
  return (
    <main className="bg-white mx-4 md:mx-12 px-4 md:px-12">
      <ArticlesClient />
    </main>
  );
} 