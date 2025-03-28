import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';

// Simulated blog data
const blogsData = [
  {
    id: '1',
    title: 'The Future of AI in Web Development',
    excerpt: 'How artificial intelligence is changing the landscape of web development and what it means for developers.',
    content: `
      <p>Artificial Intelligence (AI) is rapidly transforming the landscape of web development. As we move forward into this new era, it's becoming increasingly clear that AI will play a pivotal role in how websites and web applications are designed, developed, and maintained.</p>

      <h2>AI-Powered Design Tools</h2>
      
      <p>One of the most significant impacts of AI in web development is in the design phase. AI-powered design tools can now generate entire layouts based on simple prompts, create color schemes that align with brand guidelines, and even suggest UI components that would best serve the user's needs.</p>
      
      <p>These tools are not replacing designers but rather augmenting their capabilities. They're handling the repetitive aspects of design, allowing designers to focus on the creative and strategic elements that require human intuition and expertise.</p>
      
      <h2>Code Generation and Optimization</h2>
      
      <p>AI is also making significant strides in code generation. Tools like GitHub Copilot and similar AI assistants can now write code based on natural language descriptions, suggest optimizations, and help developers debug issues more efficiently.</p>
      
      <p>This doesn't mean developers will become obsolete. Instead, their role is evolving. The focus is shifting from writing every line of code manually to directing AI tools, reviewing and refining the generated code, and solving complex problems that still require human creativity and critical thinking.</p>
      
      <h2>Personalized User Experiences</h2>
      
      <p>AI is enabling a new level of personalization in web experiences. By analyzing user behavior, preferences, and patterns, AI algorithms can tailor content, interfaces, and functionality to individual users in real-time.</p>
      
      <p>This goes beyond simple A/B testing or rule-based personalization. Modern AI can dynamically adjust entire user experiences, creating websites that feel like they were designed specifically for each visitor.</p>
      
      <h2>Challenges and Considerations</h2>
      
      <p>While the benefits of AI in web development are substantial, there are challenges to consider:</p>
      
      <ul>
        <li><strong>Ethics and bias:</strong> AI systems can perpetuate and amplify biases present in their training data. Developers must be vigilant about ensuring these systems are fair and inclusive.</li>
        <li><strong>Privacy concerns:</strong> As AI systems collect and analyze more user data, privacy becomes an increasingly important consideration.</li>
        <li><strong>Technical limitations:</strong> Despite recent advances, AI still has limitations in understanding context, nuance, and complex human needs.</li>
      </ul>
      
      <h2>The Future Outlook</h2>
      
      <p>Looking ahead, we can expect AI to become even more integrated into the web development workflow. We'll likely see more sophisticated code generation, predictive analytics for user behavior, and AI-driven testing and optimization.</p>
      
      <p>The most successful web developers will be those who can effectively collaborate with AI tools, leveraging their capabilities while providing the human insight and creativity that AI cannot replicate.</p>
      
      <h2>Conclusion</h2>
      
      <p>AI is not replacing web developers; it's transforming how they work. By embracing these technologies and adapting to this new paradigm, developers can create better, more personalized, and more efficient web experiences than ever before.</p>
      
      <p>The future of web development is a collaborative partnership between human creativity and artificial intelligence, combining the best of both to push the boundaries of what's possible on the web.</p>
    `,
    category: 'Technology',
    tags: ['AI', 'Web Development', 'Future Tech'],
    author: 'Gaurav Kr Sah',
    date: 'January 15, 2023',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1677442135306-8a6ebfa95ec0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Optimizing React Performance: A Comprehensive Guide',
    excerpt: 'Learn advanced techniques to make your React applications faster and more efficient.',
    content: `
      <p>React is known for its virtual DOM and efficient rendering, but even React applications can suffer from performance issues as they grow in complexity. In this comprehensive guide, we'll explore various strategies to optimize your React applications for better performance.</p>

      <h2>Understanding React's Rendering Process</h2>
      
      <p>Before diving into optimization techniques, it's crucial to understand how React's rendering process works. React creates a virtual representation of the DOM (Virtual DOM) and uses a diffing algorithm to determine the minimal set of changes needed to update the actual DOM.</p>
      
      <p>However, when state changes occur, React can sometimes perform unnecessary re-renders, affecting the performance of your application. The techniques below address these and other performance concerns.</p>
      
      <h2>1. Memoization with React.memo</h2>
      
      <p>One of the simplest ways to optimize React components is to use <code>React.memo</code>. This higher-order component prevents unnecessary re-renders by memoizing the result of a component render:</p>
      
      <pre><code>
const MyComponent = React.memo(function MyComponent(props) {
  // Component code
});
      </code></pre>
      
      <p>React.memo performs a shallow comparison of props. If your component depends on complex objects, you might need to provide a custom comparison function:</p>
      
      <pre><code>
const MyComponent = React.memo(
  function MyComponent(props) {
    // Component code
  },
  (prevProps, nextProps) => {
    // Return true if passing nextProps to render would return
    // the same result as passing prevProps to render,
    // otherwise return false
  }
);
      </code></pre>
      
      <h2>2. Using useMemo and useCallback Hooks</h2>
      
      <p>The <code>useMemo</code> hook memoizes the result of a computation, recalculating it only when one of its dependencies changes:</p>
      
      <pre><code>
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
      </code></pre>
      
      <p>Similarly, <code>useCallback</code> memoizes a function, preventing it from being recreated on every render:</p>
      
      <pre><code>
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
      </code></pre>
      
      <p>These hooks are particularly useful when passing callbacks or computed values to optimized child components.</p>
      
      <h2>3. Virtual List for Large Data Sets</h2>
      
      <p>When rendering large lists, consider using virtualization. Libraries like <code>react-window</code> and <code>react-virtualized</code> only render items currently visible in the viewport, significantly reducing the number of DOM nodes:</p>
      
      <pre><code>
import { FixedSizeList } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const Example = () => (
  <FixedSizeList
    height={500}
    width={500}
    itemSize={35}
    itemCount={1000}
  >
    {Row}
  </FixedSizeList>
);
      </code></pre>
      
      <h2>4. Code Splitting with React.lazy</h2>
      
      <p>Code splitting allows you to split your bundle into smaller chunks, loading only what's necessary for the current view:</p>
      
      <pre><code>
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </React.Suspense>
  );
}
      </code></pre>
      
      <h2>5. State Management Optimization</h2>
      
      <p>For applications using Redux or other state management libraries, optimize your state structure to prevent unnecessary re-renders:</p>
      
      <ul>
        <li>Keep state normalization to avoid duplication</li>
        <li>Use selector libraries like Reselect for memoized state selection</li>
        <li>Consider using Redux Toolkit for efficient Redux development</li>
      </ul>
      
      <h2>6. Web Workers for CPU-Intensive Tasks</h2>
      
      <p>Move CPU-intensive operations off the main thread using Web Workers to keep your UI responsive:</p>
      
      <pre><code>
// In your component
const [result, setResult] = useState(null);

useEffect(() => {
  const worker = new Worker('./worker.js');
  
  worker.onmessage = (e) => {
    setResult(e.data);
    worker.terminate();
  };
  
  worker.postMessage({ data: complexData });
  
  return () => worker.terminate();
}, [complexData]);
      </code></pre>
      
      <h2>7. Optimizing Context API Usage</h2>
      
      <p>The Context API can trigger re-renders in all consuming components when the context value changes. Split your contexts based on change frequency and use the provider pattern effectively:</p>
      
      <pre><code>
// Split into multiple contexts
const ThemeContext = React.createContext();
const UserContext = React.createContext();

// In your component tree
return (
  <ThemeContext.Provider value={theme}>
    <UserContext.Provider value={user}>
      <App />
    </UserContext.Provider>
  </ThemeContext.Provider>
);
      </code></pre>
      
      <h2>8. Performance Monitoring</h2>
      
      <p>Use tools like React DevTools Profiler, Lighthouse, and Chrome Performance tab to identify performance bottlenecks in your application.</p>
      
      <h2>Conclusion</h2>
      
      <p>Performance optimization in React is an ongoing process that requires understanding both React's internals and general web performance principles. By applying these techniques strategically where they're needed most, you can significantly improve your application's performance without overcomplicating your codebase.</p>
      
      <p>Remember that premature optimization can lead to unnecessary complexity. Always measure first, then optimize based on data rather than assumptions.</p>
    `,
    category: 'Web Development',
    tags: ['React', 'Performance', 'JavaScript'],
    author: 'Gaurav Kr Sah',
    date: 'March 22, 2023',
    readTime: '12 min read',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
  },
  // More blog data would be here
];

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Blog Detail | Gaurav Kr Sah";
    
    // Simulate API call to fetch blog data
    setTimeout(() => {
      const foundBlog = blogsData.find(b => b.id === id);
      setBlog(foundBlog);
      setIsLoading(false);
      
      if (foundBlog) {
        document.title = `${foundBlog.title} | Gaurav Kr Sah`;
      }
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-black text-white">
        <div className="sticky top-0 h-screen">
          <LeftSidebar />
        </div>
        <main className="flex-1 p-8 flex justify-center items-center">
          <div className="animate-pulse space-y-8 w-full max-w-3xl">
            <div className="h-8 bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded"></div>
            </div>
          </div>
        </main>
        <div className="sticky top-0 h-screen">
          <RightSidebar />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen bg-black text-white">
        <div className="sticky top-0 h-screen">
          <LeftSidebar />
        </div>
        <main className="flex-1 p-8 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blogs" className="flex items-center text-blue-500 hover:text-blue-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </main>
        <div className="sticky top-0 h-screen">
          <RightSidebar />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-screen">
          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              <Link to="/blogs" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Link>
              
              <article className="space-y-8">
                <header className="space-y-6">
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">{blog.title}</h1>
                  
                  <div className="flex flex-wrap items-center text-gray-400 gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {blog.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {blog.date}
                    </div>
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      {blog.category}
                    </div>
                    <div>{blog.readTime}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </header>
                
                <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div 
                  className="prose prose-invert max-w-none text-gray-300 lg:text-lg"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                
                <footer className="border-t border-gray-800 pt-6 mt-10">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold">G</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Gaurav Kr Sah</h3>
                        <p className="text-gray-400 text-sm">Developer and Consultant</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </footer>
              </article>
            </div>
          </div>
        </ScrollArea>
      </main>
      <div className="sticky top-0 h-screen">
        <RightSidebar />
      </div>
    </div>
  );
};

export default BlogDetail;
