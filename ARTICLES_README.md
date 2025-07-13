# Articles System

This website now includes a comprehensive articles system with search functionality and support for interactive content.

## Features

### 1. Articles Listing Page (`/articles`)
- **Search functionality**: Search through article titles, excerpts, and tags
- **Category filtering**: Filter articles by category (mathematics, software, ai, etc.)
- **Tag filtering**: Filter articles by specific tags
- **Responsive grid layout**: Articles display in a clean, responsive grid
- **Interactive indicators**: Articles with interactive content are clearly marked

### 2. Individual Article Pages (`/articles/[id]`)
- **Full article content**: Rich text content with proper typography
- **Interactive content support**: Placeholder for interactive components
- **Navigation**: Easy navigation back to articles listing
- **Metadata display**: Tags, categories, dates, and interactive status

### 3. Interactive Content Support
- **Canvas-based demos**: Built-in support for interactive visualizations
- **Custom components**: Framework for adding React-based interactive elements
- **Animation controls**: Play, pause, step, and reset functionality

## How to Add Articles

### 1. Add to Articles List
Edit `src/app/articles/page.tsx` and add your article to the `sampleArticles` array:

```typescript
{
  id: "your-article-id",
  title: "Your Article Title",
  excerpt: "Brief description of your article",
  content: `
    <h2>Your Article Content</h2>
    <p>Your article content in HTML format...</p>
    
    <div class="interactive-demo">
      <h4>Interactive: Your Demo</h4>
      <p>Description of your interactive content:</p>
      <div id="your-demo"></div>
    </div>
  `,
  tags: ["tag1", "tag2", "tag3"],
  date: "2024-01-15",
  interactive: true, // or false
  category: "your-category"
}
```

### 2. Create Interactive Components
You can create custom interactive components in `src/components/` and import them into your articles.

Example interactive component structure:
```typescript
// src/components/YourInteractiveDemo.tsx
export default function YourInteractiveDemo() {
  // Your interactive logic here
  return (
    <div className="interactive-demo">
      {/* Your interactive content */}
    </div>
  );
}
```

### 3. Supported Interactive Types
The built-in `InteractiveDemo` component supports:
- **Sequence**: Animated sequence convergence visualization
- **Matrix**: Matrix operations and transformations
- **Neural Network**: Neural network architecture visualization

## Customization

### Styling
- Article styles are in `src/app/globals.css`
- Interactive demo styles are included
- Responsive design with Tailwind CSS

### Adding New Categories
1. Add your category to articles in the `sampleArticles` array
2. Categories will automatically appear in the filter

### Adding New Interactive Types
1. Extend the `InteractiveDemo` component
2. Add new drawing functions
3. Update the switch statement in the component

## Technical Details

### File Structure
```
src/
├── app/
│   ├── articles/
│   │   ├── page.tsx          # Articles listing page
│   │   └── [id]/
│   │       └── page.tsx      # Individual article pages
│   └── globals.css           # Article styles
└── components/
    └── InteractiveDemo.tsx   # Interactive component
```

### Data Structure
```typescript
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  tags: string[];
  date: string;
  interactive: boolean;
  category: string;
}
```

## Future Enhancements

1. **Database Integration**: Move from static data to a database
2. **Markdown Support**: Add markdown parsing for easier content creation
3. **Rich Text Editor**: Add an admin interface for creating articles
4. **Comments System**: Add commenting functionality
5. **Social Sharing**: Add social media sharing buttons
6. **Analytics**: Track article views and engagement
7. **Search API**: Implement server-side search for better performance
8. **Image Support**: Add image upload and management
9. **Code Highlighting**: Add syntax highlighting for code blocks
10. **Math Rendering**: Add LaTeX support for mathematical equations

## Libraries You Can Integrate

For enhanced interactive content, consider these libraries:

- **D3.js**: Data visualizations and charts
- **Three.js**: 3D graphics and animations
- **Chart.js**: Simple charts and graphs
- **KaTeX**: Mathematical equation rendering
- **Prism.js**: Code syntax highlighting
- **Framer Motion**: React animations
- **React Spring**: Physics-based animations
- **P5.js**: Creative coding and graphics

## Getting Started

1. Navigate to `/articles` to see the articles listing
2. Use the search and filter functionality
3. Click on any article to view its full content
4. Try the interactive demos in articles marked as "interactive"

The system is designed to be easily extensible and maintainable, allowing you to focus on creating great content rather than managing complex infrastructure. 