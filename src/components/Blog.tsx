import React, { useState, useMemo, useEffect } from 'react';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { tools } from '../data';
import { 
  ArrowLeft, Search, Clock, Calendar, User, Share2, Copy, Check,
  BookOpen, Sparkles, Award, ArrowRight, ExternalLink, AlertCircle
} from 'lucide-react';

interface BlogProps {
  language: 'en' | 'ar';
  darkMode: boolean;
  selectedPostId: string | null;
  navigateTo: (tab: any, toolId?: string | null, blogPostId?: string | null) => void;
}

export default function Blog({ language, darkMode, selectedPostId, navigateTo }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSubTab, setActiveSubTab] = useState<'explore' | 'latest' | 'popular'>('explore');
  const [copiedId, setCopiedId] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Dynamic AJAX-based article loading states
  const [dynamicContent, setDynamicContent] = useState<string | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const categories = useMemo(() => {
    return [
      { id: 'all', labelEn: 'All Articles', labelAr: 'كل المقالات' },
      { id: 'PDF Tools', labelEn: 'PDF Utilities', labelAr: 'أدوات الـ PDF' },
      { id: 'Image Tools', labelEn: 'Image Utilities', labelAr: 'أدوات الصور' },
      { id: 'AI Tools', labelEn: 'AI & Machine Learning', labelAr: 'الذكاء الاصطناعي' },
      { id: 'Text Tools', labelEn: 'Text & Code Utilities', labelAr: 'أدوات النصوص' },
      { id: 'Productivity', labelEn: 'Productivity Hacks', labelAr: 'زيادة الإنتاجية' },
      { id: 'Privacy', labelEn: 'Data Privacy', labelAr: 'الخصوصية الرقمية' },
      { id: 'Security', labelEn: 'Cyber Security', labelAr: 'الأمن الرقمي' },
      { id: 'Browser Utilities', labelEn: 'Browser Features', labelAr: 'تقنيات الويب' }
    ];
  }, []);

  // Update reading progress bar on scroll inside detail view
  useEffect(() => {
    if (!selectedPostId) {
      setReadingProgress(0);
      return;
    }
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPostId]);

  // Find active post
  const activePost = useMemo(() => {
    if (!selectedPostId) return null;
    return blogPosts.find(post => post.id === selectedPostId) || null;
  }, [selectedPostId]);

  // Load dynamic blog content from server on demand
  useEffect(() => {
    if (!selectedPostId) {
      setDynamicContent(null);
      setIsLoadingContent(false);
      setFetchError(null);
      return;
    }

    const post = blogPosts.find(p => p.id === selectedPostId);
    if (!post) return;

    const staticContent = language === 'en' ? post.contentEn : post.contentAr;
    if (staticContent && staticContent.trim().length > 0) {
      setDynamicContent(staticContent);
      setIsLoadingContent(false);
      setFetchError(null);
      return;
    }

    // Trigger API request to load generated 1500+ word article dynamically
    setIsLoadingContent(true);
    setFetchError(null);
    setDynamicContent(null);

    fetch(`/api/blog/posts/${selectedPostId}?lang=${language}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(language === 'en' ? 'Failed to retrieve or compile the article.' : 'فشل تحميل محتوى المقال التعليمي.');
        }
        return res.json();
      })
      .then(data => {
        setDynamicContent(data.content);
        setIsLoadingContent(false);
      })
      .catch(err => {
        console.error("Failed to load dynamic blog post:", err);
        setFetchError(err.message);
        setIsLoadingContent(false);
      });
  }, [selectedPostId, language]);

  // Find related tools matching this article
  const relatedTools = useMemo(() => {
    if (!activePost) return [];
    const cat = activePost.category.toLowerCase();
    return tools.filter(tool => {
      const toolCat = tool.category.toLowerCase();
      const toolName = tool.name.toLowerCase();
      const toolAr = tool.arabicName.toLowerCase();
      const postId = activePost.id.toLowerCase();
      
      return toolCat.includes(cat) || cat.includes(toolCat) ||
             postId.includes(tool.id) || tool.id.includes(postId) ||
             toolName.includes(cat) || toolAr.includes(cat);
    }).slice(0, 3);
  }, [activePost]);

  // Filter and Search posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      
      const title = (language === 'en' ? post.titleEn : post.titleAr).toLowerCase();
      const summary = (language === 'en' ? post.summaryEn : post.summaryAr).toLowerCase();
      const search = searchQuery.toLowerCase();
      const matchesSearch = title.includes(search) || summary.includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, language]);

  // Apply Sub-Tabs: Explore All, Latest Articles, Most Popular
  const processedPosts = useMemo(() => {
    let posts = [...filteredPosts];
    
    if (activeSubTab === 'latest') {
      // Sort by date (newest first)
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (activeSubTab === 'popular') {
      // Sort deterministically based on readTime and title length to yield attractive popular rankings
      posts.sort((a, b) => {
        const aPop = a.titleEn.length + (parseInt(a.readTime) || 5);
        const bPop = b.titleEn.length + (parseInt(b.readTime) || 5);
        return bPop - aPop;
      });
    }
    
    return posts;
  }, [filteredPosts, activeSubTab]);

  // Handle Copy Article Link for SEO/Marketing
  const handleCopyLink = (postId: string) => {
    const origin = window.location.origin;
    const path = `${origin}/blog/${postId}`;
    navigator.clipboard.writeText(path).then(() => {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    });
  };

  const getAdSensePlaceholder = (type: 'banner' | 'in-article' | 'feed') => {
    const isDark = darkMode;
    let styleClasses = '';
    let label = '';
    
    if (type === 'banner') {
      styleClasses = 'h-24 md:h-28';
      label = language === 'en' ? 'Responsive AdSense Header Banner' : 'إعلان متجاوب عالي التفاعل';
    } else if (type === 'in-article') {
      styleClasses = 'h-32 md:h-40';
      label = language === 'en' ? 'In-Article Google AdSense Native Ad' : 'إعلان وسط المقال ذكي ومدمج';
    } else {
      styleClasses = 'h-44';
      label = language === 'en' ? 'Matched Content & Recommendations' : 'إعلانات المحتوى المطابق والشبيه';
    }

    return (
      <div className={`p-4 rounded-2xl border text-center font-mono ${isDark ? 'bg-[#090e18]/80 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400'} animate-pulse-soft`}>
        <div className="flex justify-between items-center text-[9px] uppercase tracking-widest opacity-60 mb-2">
          <span>{language === 'en' ? 'Advertisement' : 'إعلان ممول'}</span>
          <span className="px-1.5 py-0.5 rounded border border-current">AdSense Active</span>
        </div>
        <div className={`flex flex-col items-center justify-center border border-dashed rounded-lg border-current opacity-40 ${styleClasses}`}>
          <p className="text-xs font-bold">{label}</p>
          <p className="text-[10px] mt-1 opacity-75">{language === 'en' ? '100% SEO Friendly & Non-Intrusive' : 'متطابق بالكامل مع السيو وتجربة المستخدم'}</p>
        </div>
      </div>
    );
  };

  // Robust Markdown parsing renderer supporting lists, tables, blockquotes, code blocks, and headers
  const renderFormattedMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    let currentList: string[] = [];
    let listType: 'bullet' | 'ordered' | null = null;

    let currentTableRows: string[][] = [];
    let inTable = false;

    let currentQuote: string[] = [];
    let inQuote = false;

    let currentCode: string[] = [];
    let inCode = false;
    let codeLang = '';

    const renderInlineMarkdown = (str: string) => {
      if (!str) return '';
      const parts = str.split(/\*\*(.*?)\*\*/g);
      return parts.map((part, i) => {
        if (i % 2 === 1) {
          return <strong key={i} className="text-white font-extrabold">{part}</strong>;
        }
        return part;
      });
    };

    const flushList = (key: string | number) => {
      if (currentList.length > 0) {
        if (listType === 'ordered') {
          elements.push(
            <ol key={`olist-${key}`} className="list-decimal list-inside space-y-2.5 pl-4 pr-4 my-4 text-slate-300 text-xs sm:text-sm">
              {currentList.map((item, lidx) => (
                <li key={lidx} className="leading-relaxed">
                  {renderInlineMarkdown(item)}
                </li>
              ))}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`ulist-${key}`} className="list-disc list-inside space-y-2.5 pl-4 pr-4 my-4 text-slate-300 text-xs sm:text-sm">
              {currentList.map((item, lidx) => (
                <li key={lidx} className="leading-relaxed">
                  {renderInlineMarkdown(item)}
                </li>
              ))}
            </ul>
          );
        }
        currentList = [];
        listType = null;
      }
    };

    const flushTable = (key: string | number) => {
      if (currentTableRows.length > 0) {
        const rows = currentTableRows.filter(r => !r.every(cell => cell.trim().match(/^-+$/)));
        if (rows.length > 0) {
          const headers = rows[0];
          const bodyRows = rows.slice(1);
          elements.push(
            <div key={`table-${key}`} className="overflow-x-auto my-6 rounded-xl border border-slate-800/60 bg-slate-950/40">
              <table className="w-full text-xs text-slate-300 border-collapse animate-fade-in" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60">
                    {headers.map((h, hidx) => (
                      <th key={hidx} className="px-4 py-3 text-start font-black text-white whitespace-nowrap">
                        {renderInlineMarkdown(h.trim())}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((row, ridx) => (
                    <tr key={ridx} className="border-b border-slate-800/40 hover:bg-slate-900/10">
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="px-4 py-2.5 text-slate-300 leading-relaxed">
                          {renderInlineMarkdown(cell ? cell.trim() : '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        currentTableRows = [];
        inTable = false;
      }
    };

    const flushQuote = (key: string | number) => {
      if (currentQuote.length > 0) {
        elements.push(
          <blockquote key={`quote-${key}`} className="pl-4 pr-4 py-3 border-l-4 border-blue-500 bg-blue-500/5 rounded-r-xl my-5 text-slate-300 italic text-xs sm:text-sm leading-relaxed">
            {currentQuote.map((q, qidx) => (
              <p key={qidx} className={qidx > 0 ? "mt-2" : ""}>
                {renderInlineMarkdown(q)}
              </p>
            ))}
          </blockquote>
        );
        currentQuote = [];
        inQuote = false;
      }
    };

    const flushCode = (key: string | number) => {
      if (currentCode.length > 0) {
        elements.push(
          <div key={`code-${key}`} className="my-5 rounded-xl border border-slate-800/80 bg-slate-950/70 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-w-full">
            {codeLang && (
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 border-b border-slate-800/50 pb-1 flex justify-between">
                <span>{codeLang}</span>
                <span>Code Example</span>
              </div>
            )}
            <pre className="whitespace-pre">
              {currentCode.join('\n')}
            </pre>
          </div>
        );
        currentCode = [];
        inCode = false;
        codeLang = '';
      }
    };

    const flushAll = (key: string | number) => {
      flushList(key);
      flushTable(key);
      flushQuote(key);
      flushCode(key);
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Code Block Detection
      if (trimmed.startsWith('```')) {
        if (inCode) {
          flushCode(idx);
        } else {
          flushAll(idx);
          inCode = true;
          codeLang = trimmed.slice(3).trim();
        }
        return;
      }

      if (inCode) {
        currentCode.push(line);
        return;
      }

      // Table Detection
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        if (!inTable) {
          flushAll(idx);
          inTable = true;
        }
        const parts = line.split('|').slice(1, -1);
        currentTableRows.push(parts);
        return;
      } else {
        if (inTable) {
          flushTable(idx);
        }
      }

      // Blockquote Detection
      if (trimmed.startsWith('>')) {
        if (!inQuote) {
          flushAll(idx);
          inQuote = true;
        }
        currentQuote.push(trimmed.slice(1).trim());
        return;
      } else {
        if (inQuote) {
          flushQuote(idx);
        }
      }

      // Unordered Lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (listType !== 'bullet') {
          flushAll(idx);
          listType = 'bullet';
        }
        currentList.push(trimmed.slice(2));
        return;
      } 
      
      // Ordered Lists
      if (/^\d+\.\s/.test(trimmed)) {
        if (listType !== 'ordered') {
          flushAll(idx);
          listType = 'ordered';
        }
        const match = trimmed.match(/^\d+\.\s(.*)/);
        currentList.push(match ? match[1] : trimmed);
        return;
      }

      // Normal lines or headings
      flushAll(idx);

      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={idx} className="text-xl md:text-2xl font-black text-white mt-8 mb-4 leading-tight">
            {renderInlineMarkdown(trimmed.slice(2))}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-base md:text-lg font-extrabold text-white mt-8 mb-4 border-b border-slate-800 pb-2 leading-snug">
            {renderInlineMarkdown(trimmed.slice(3))}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-sm md:text-base font-bold text-blue-400 mt-6 mb-3 leading-snug">
            {renderInlineMarkdown(trimmed.slice(4))}
          </h3>
        );
      } else if (trimmed.startsWith('#### ')) {
        elements.push(
          <h4 key={idx} className="text-xs font-semibold text-indigo-300 mt-4 mb-2">
            {renderInlineMarkdown(trimmed.slice(5))}
          </h4>
        );
      } else if (trimmed === '---') {
        elements.push(
          <hr key={idx} className="border-t border-slate-800 my-8 border-dashed" />
        );
      } else if (trimmed !== '') {
        elements.push(
          <p key={idx} className="text-slate-300 text-xs md:text-sm leading-relaxed mb-4">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      }
    });

    flushAll('end');
    return elements;
  };

  // 1. LOADING STATE VIEW
  if (isLoadingContent) {
    return (
      <div className="max-w-3xl mx-auto pb-16 px-4 animate-fade-in relative text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <button 
          onClick={() => navigateTo('blog')}
          className={`inline-flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border transition-all cursor-pointer ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Back to Blog' : 'العودة للمدونة'}</span>
        </button>

        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-slate-800 rounded-full w-24"></div>
          <div className="h-8 bg-slate-800 rounded-full w-full"></div>
          <div className="h-8 bg-slate-800 rounded-full w-3/4"></div>
          <div className="flex gap-4 pt-4">
            <div className="h-4 bg-slate-800 rounded-full w-20"></div>
            <div className="h-4 bg-slate-800 rounded-full w-20"></div>
            <div className="h-4 bg-slate-800 rounded-full w-20"></div>
          </div>
        </div>

        <div className="my-8 h-24 bg-slate-800 rounded-2xl animate-pulse"></div>

        <div className="space-y-6 pt-6 animate-pulse">
          <div className="h-4 bg-slate-800 rounded-full w-full"></div>
          <div className="h-4 bg-slate-800 rounded-full w-11/12"></div>
          <div className="h-4 bg-slate-800 rounded-full w-10/12"></div>
          <div className="h-4 bg-slate-800 rounded-full w-4/5"></div>
          <div className="h-4 bg-slate-800 rounded-full w-full"></div>
          <div className="h-4 bg-slate-800 rounded-full w-11/12"></div>
        </div>
      </div>
    );
  }

  // 2. ERROR STATE VIEW
  if (fetchError) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 inline-flex">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white">{language === 'en' ? 'Unable to Load Article' : 'عذراً، فشل تحميل المقال'}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{fetchError}</p>
        <button 
          onClick={() => navigateTo('blog')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white transition-all cursor-pointer"
        >
          {language === 'en' ? 'Back to Blog Index' : 'العودة للمدونة'}
        </button>
      </div>
    );
  }

  // 3. BLOG ARTICLE DETAIL VIEW
  if (activePost && dynamicContent) {
    const title = language === 'en' ? activePost.titleEn : activePost.titleAr;
    const summary = language === 'en' ? activePost.summaryEn : activePost.summaryAr;

    return (
      <div className="max-w-3xl mx-auto pb-16 px-4 animate-fade-in relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div 
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50 transition-all duration-100" 
          style={{ width: `${readingProgress}%` }}
        />

        <button 
          onClick={() => navigateTo('blog')}
          className={`inline-flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border transition-all cursor-pointer ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Back to Blog' : 'العودة للمدونة'}</span>
        </button>

        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{activePost.category}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-white">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-dashed border-slate-800/80 pb-6">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4 text-slate-500" />
              <span>{activePost.author}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>{activePost.date}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{activePost.readTime}</span>
            </span>
            <button 
              onClick={() => handleCopyLink(activePost.id)}
              className="ml-auto flex items-center gap-1 bg-slate-500/10 hover:bg-slate-500/20 px-2.5 py-1 rounded text-slate-300 hover:text-white transition-all cursor-pointer text-[10px] font-bold uppercase tracking-wider border border-slate-800"
            >
              {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId ? (language === 'en' ? 'Copied' : 'تم النسخ') : (language === 'en' ? 'Copy Link' : 'نسخ الرابط')}</span>
            </button>
          </div>
        </div>

        <div className="my-8">
          {getAdSensePlaceholder('banner')}
        </div>

        <div className={`p-6 rounded-2xl border text-slate-300 text-xs md:text-sm font-semibold italic leading-relaxed mb-8 ${darkMode ? 'border-slate-800 bg-[#070b14]/50 text-indigo-200' : 'bg-slate-50 border-slate-200 text-indigo-900'}`}>
          {summary}
        </div>

        {/* Detailed article content parsed from dynamic Markdown */}
        <div className="prose prose-invert max-w-none text-slate-300 text-xs md:text-sm leading-relaxed space-y-6 text-left">
          {renderFormattedMarkdown(dynamicContent)}
        </div>

        <div className="my-12">
          {getAdSensePlaceholder('feed')}
        </div>

        {/* Cross-linked Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-12 border-t border-slate-800 pt-8 text-left">
            <h3 className="text-sm md:text-base font-extrabold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{language === 'en' ? 'Related Free Tools (No Server Upload)' : 'الأدوات المجانية ذات الصلة (بدون رفع للمخدم)'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedTools.map(tool => (
                <div 
                  key={tool.id}
                  onClick={() => navigateTo('home', tool.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${darkMode ? 'bg-[#080d16] border-slate-800 hover:border-blue-500/40 hover:bg-[#0b1322]' : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 hover:bg-slate-100'}`}
                >
                  <div>
                    <h4 className="text-xs font-black text-slate-100 group-hover:text-blue-400 transition-colors">
                      {language === 'en' ? tool.name : tool.arabicName}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                      {language === 'en' ? tool.description : tool.arabicDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-blue-400 font-bold mt-4">
                    <span>{language === 'en' ? 'Use Tool' : 'استخدم الأداة'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center border-t border-slate-800 pt-8 mt-12 text-xs text-left">
          <div>
            <h4 className="text-slate-500 font-bold uppercase tracking-wider">{language === 'en' ? 'Platform Security Guarantee' : 'ضمان الأمان الفيدرالي'}</h4>
            <p className="text-slate-400 mt-1">{language === 'en' ? 'All computations strictly run local in browser volatile RAM.' : 'تتم كافة المعالجات والعمليات الحسابية محلياً بالكامل.'}</p>
          </div>
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold hover:underline cursor-pointer"
          >
            {language === 'en' ? 'Explore Tools' : 'استكشف الأدوات'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 4. BLOG LISTINGS VIEW
  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 animate-fade-in text-left" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Blog Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Toolix Knowledge Hub' : 'أكاديمية المعرفة والتقنية'}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
          {language === 'en' ? 'Corporate Blog & Insights' : 'المدونة ومقالات المعرفة'}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          {language === 'en'
            ? 'Discover original, deeply educational technical guides about browser-native tools, privacy framework audits, and extreme client productivity.'
            : 'تصفح مقالات برمجية وتثقيفية معاصرة تغطي تقنيات الويب، معالجة الصور، أمان البيانات، وزيادة إنتاجية المطورين.'}
        </p>
      </div>

      {/* Pages Selector: All, Latest, Popular */}
      <div className="flex justify-center gap-3 border-b border-slate-800/80 pb-4 mb-8">
        <button
          onClick={() => { setActiveSubTab('explore'); setSelectedCategory('all'); }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${activeSubTab === 'explore' ? 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
        >
          {language === 'en' ? 'Explore All' : 'استكشف المقالات'}
        </button>
        <button
          onClick={() => setActiveSubTab('latest')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${activeSubTab === 'latest' ? 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
        >
          {language === 'en' ? 'Latest Articles' : 'أحدث المقالات'}
        </button>
        <button
          onClick={() => setActiveSubTab('popular')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${activeSubTab === 'popular' ? 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
        >
          {language === 'en' ? 'Most Popular' : 'أشهر المقالات'}
        </button>
      </div>

      {/* Filter and Search Box */}
      <div className="space-y-6 mb-8">
        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input 
              type="text"
              placeholder={language === 'en' ? 'Search educational articles...' : 'ابحث في مقالات المعرفة...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-5 py-3.5 rounded-2xl border text-xs outline-none transition-all ${darkMode ? 'bg-slate-900/60 border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'}`}
            />
            <Search className={`w-4.5 h-4.5 absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} />
          </div>
        </div>

        {/* Categories Scroller (Only visible under Explore tab) */}
        {activeSubTab === 'explore' && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all cursor-pointer whitespace-nowrap border shrink-0 ${isSelected ? 'bg-blue-600 border-blue-500 text-white shadow' : darkMode ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  {language === 'en' ? cat.labelEn : cat.labelAr}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {getAdSensePlaceholder('banner')}

      {/* Blog Cards Grid */}
      {processedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {processedPosts.map((post) => {
            const title = language === 'en' ? post.titleEn : post.titleAr;
            const summary = language === 'en' ? post.summaryEn : post.summaryAr;
            return (
              <div 
                key={post.id}
                onClick={() => navigateTo('blog-post', null, post.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${darkMode ? 'border-slate-800 bg-[#070b14]/50 shadow-2xl hover:border-slate-700 hover:scale-[1.01]' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:scale-[1.01]'}`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-[9px] font-extrabold uppercase tracking-wider ${darkMode ? 'bg-slate-900 border border-slate-800 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                  
                  <h3 className={`text-base font-black leading-snug group-hover:text-blue-400 transition-colors ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    {title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 mt-6 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.author}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-400 font-bold group-hover:underline">
                    <span>{language === 'en' ? 'Read Guide' : 'اقرأ المقال'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-slate-500 text-center py-12">{language === 'en' ? 'No articles found matching your criteria.' : 'لم نجد أي مقالات تطابق هذا البحث.'}</p>
      )}

      {getAdSensePlaceholder('feed')}
    </div>
  );
}
