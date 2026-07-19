import React, { useState, useMemo } from 'react';
import { 
  Home, Wrench, FileText, Files, FileImage, Braces, Lock, Percent, 
  Scale, Sparkles, BookOpen, Heart, History, Settings, Info, 
  HelpCircle, ShieldCheck, Mail, Search, Award, MapPin, ListCollapse
} from 'lucide-react';
import { tools } from '../data';
import { blogPosts } from '../data/blogPosts';
import { Tool } from '../types';

interface SitemapProps {
  language: 'en' | 'ar';
  darkMode: boolean;
  navigateTo: (tab: any, toolId?: string | null, blogPostId?: string | null) => void;
}

export default function Sitemap({ language, darkMode, navigateTo }: SitemapProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // 10 Categories matching site definitions
  const CATEGORIES = [
    { id: 'pdf-tools', labelEn: 'PDF Tools', labelAr: 'أدوات بي دي إف', icon: Files, color: 'text-red-400 bg-red-500/10' },
    { id: 'image-tools', labelEn: 'Image Tools', labelAr: 'أدوات الصور', icon: FileImage, color: 'text-purple-400 bg-purple-500/10' },
    { id: 'text-tools', labelEn: 'Text Tools', labelAr: 'أدوات النصوص', icon: FileText, color: 'text-emerald-400 bg-emerald-500/10' },
    { id: 'developer-tools', labelEn: 'Developer Tools', labelAr: 'أدوات المطورين', icon: Braces, color: 'text-blue-400 bg-blue-500/10' },
    { id: 'security-tools', labelEn: 'Security Tools', labelAr: 'أدوات الحماية والأمان', icon: Lock, color: 'text-indigo-400 bg-indigo-500/10' },
    { id: 'calculators', labelEn: 'Calculators', labelAr: 'الحاسبات الرقمية', icon: Percent, color: 'text-cyan-400 bg-cyan-500/10' },
    { id: 'converters', labelEn: 'Converters', labelAr: 'المحولات الرقمية', icon: Scale, color: 'text-amber-400 bg-amber-500/10' },
    { id: 'generators', labelEn: 'Generators', labelAr: 'المولدات الذكية', icon: Sparkles, color: 'text-pink-400 bg-pink-500/10' },
    { id: 'ai-tools', labelEn: 'AI Tools', labelAr: 'أدوات الذكاء الاصطناعي', icon: Sparkles, color: 'text-fuchsia-400 bg-fuchsia-500/10' }
  ];

  // Core static & corporate pages list
  const CORE_PAGES = [
    { id: 'home', labelEn: 'Dashboard Home', labelAr: 'الرئيسية', icon: Home },
    { id: 'tools', labelEn: 'All Utilities Directory', labelAr: 'دليل كافة الأدوات', icon: Wrench },
    { id: 'favorites', labelEn: 'Saved Favorites', labelAr: 'المفضلة', icon: Heart },
    { id: 'history', labelEn: 'Detailed Operation Logs', labelAr: 'سجل العمليات', icon: History },
    { id: 'settings', labelEn: 'Platform Settings', labelAr: 'الإعدادات', icon: Settings },
    { id: 'status', labelEn: 'System Status Monitor', labelAr: 'حالة النظام', icon: Sparkles },
    { id: 'blog', labelEn: 'Knowledge Blog Hub', labelAr: 'مدونة المعرفة', icon: BookOpen }
  ];

  const CORPORATE_PAGES = [
    { id: 'about', labelEn: 'About Us & Mission', labelAr: 'من نحن وعن رسالتنا', icon: Info },
    { id: 'mission', labelEn: 'Our Core Mission', labelAr: 'رسالتنا وأهدافنا', icon: Award },
    { id: 'vision', labelEn: 'Our Strategic Vision', labelAr: 'رؤية المنصة', icon: MapPin },
    { id: 'team', labelEn: 'Meet The Experts Team', labelAr: 'فريق العمل والخبراء', icon: HelpCircle },
    { id: 'story', labelEn: 'Our Founding Story', labelAr: 'قصة تأسيس توليكس', icon: BookOpen },
    { id: 'support', labelEn: 'Support & Help Center', labelAr: 'مركز الدعم والمساعدة', icon: ShieldCheck }
  ];

  const LEGAL_PAGES = [
    { id: 'privacy', labelEn: 'Privacy Policy & Data Security', labelAr: 'سياسة الخصوصية وأمن البيانات', icon: ShieldCheck },
    { id: 'terms', labelEn: 'Terms of Service & Usage', labelAr: 'شروط الخدمة والاستخدام', icon: FileText },
    { id: 'cookie', labelEn: 'Cookie Policy & Disclosures', labelAr: 'سياسة ملفات تعريف الارتباط', icon: Info },
    { id: 'disclaimer', labelEn: 'Legal Disclaimer', labelAr: 'إخلاء المسؤولية القانونية', icon: ShieldCheck },
    { id: 'contact', labelEn: 'Contact Technical Support', labelAr: 'اتصل بنا والدعم الفني', icon: Mail }
  ];

  // Filter tools and blog posts based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return tools;
    const query = searchQuery.toLowerCase();
    return tools.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.arabicName.includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.arabicDescription.includes(query)
    );
  }, [searchQuery]);

  const filteredBlogPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    const query = searchQuery.toLowerCase();
    return blogPosts.filter(p => 
      p.titleEn.toLowerCase().includes(query) || 
      p.titleAr.includes(query) ||
      p.summaryEn.toLowerCase().includes(query) ||
      p.summaryAr.includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 space-y-10 animate-fade-in text-left" dir={language === 'ar' ? 'rtl' : 'ltr'} id="html-sitemap-container">
      {/* Title Header with Breadcrumbs & Meta */}
      <div className={`rounded-3xl p-6 sm:p-8 border relative overflow-hidden ${darkMode ? 'bg-slate-900/40 border-slate-800/85 shadow-2xl backdrop-blur-xl' : 'bg-white border-slate-200 shadow-xl'}`} id="sitemap-header">
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-extrabold uppercase tracking-widest">
            <ListCollapse className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Sitemap Index' : 'دليل خريطة الموقع'}</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-black font-display tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {language === 'en' ? 'HTML Sitemap Directory' : 'خريطة الموقع التفاعلية'}
          </h1>
          <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} max-w-2xl leading-relaxed`}>
            {language === 'en'
              ? 'Find and access all developer resources, calculators, privacy guidelines, corporate details, and professional knowledge articles across Toolix instantly.'
              : 'تصفح كافة الأقسام والصفحات، وحاسبات التمويل، وأدوات البرمجة والتصميم، وسياسات الأمان، بالإضافة إلى دليل كامل لجميع مقالات مدونة توليكس المعرفية.'}
          </p>
        </div>
      </div>

      {/* Search Sitemap Field */}
      <div className={`p-4 rounded-2xl border flex items-center gap-3 ${darkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-inner'}`} id="sitemap-search-section">
        <Search className={`w-4 h-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === 'en' ? 'Search sitemap links, tools, or articles...' : 'ابحث في خريطة الموقع عن روابط أو أدوات أو مقالات محددة...'}
          className={`bg-transparent border-none outline-none w-full text-xs font-semibold ${darkMode ? 'text-white placeholder-slate-600' : 'text-slate-800 placeholder-slate-400'}`}
          id="sitemap-search-input"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className={`text-[10px] font-bold px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white`}
          >
            {language === 'en' ? 'Clear' : 'مسح'}
          </button>
        )}
      </div>

      {/* Grid of Main Navigation Pages & Corporate Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="sitemap-static-corporate-legal">
        {/* 1. Core Platform Pages */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#060a13]/50 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`} id="sitemap-core-nav-box">
          <h2 className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-slate-200 animate-pulse' : 'text-slate-800'} border-b ${darkMode ? 'border-slate-850' : 'border-slate-100'} pb-2 flex items-center gap-2`}>
            <Home className="w-4 h-4 text-blue-400" />
            <span>{language === 'en' ? 'Main Platform Navigation' : 'الروابط والصفحات الأساسية'}</span>
          </h2>
          <ul className="space-y-3">
            {CORE_PAGES.map(page => (
              <li key={page.id} className="flex items-center gap-2">
                <page.icon className={`w-3.5 h-3.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <button 
                  onClick={() => navigateTo(page.id)}
                  className={`text-xs font-bold hover:text-blue-400 text-left transition-colors cursor-pointer ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  {language === 'en' ? page.labelEn : page.labelAr}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Corporate & Company Pages */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#060a13]/50 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`} id="sitemap-corporate-box">
          <h2 className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-slate-200 animate-pulse' : 'text-slate-800'} border-b ${darkMode ? 'border-slate-850' : 'border-slate-100'} pb-2 flex items-center gap-2`}>
            <Info className="w-4 h-4 text-purple-400" />
            <span>{language === 'en' ? 'Corporate & Company' : 'الشركة ومعلومات الأثر'}</span>
          </h2>
          <ul className="space-y-3">
            {CORPORATE_PAGES.map(page => (
              <li key={page.id} className="flex items-center gap-2">
                <page.icon className={`w-3.5 h-3.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <button 
                  onClick={() => navigateTo(page.id)}
                  className={`text-xs font-bold hover:text-blue-400 text-left transition-colors cursor-pointer ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  {language === 'en' ? page.labelEn : page.labelAr}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Legal & Compliance Pages */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-[#060a13]/50 border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'} space-y-4`} id="sitemap-legal-box">
          <h2 className={`text-xs font-black uppercase tracking-wider ${darkMode ? 'text-slate-200 animate-pulse' : 'text-slate-800'} border-b ${darkMode ? 'border-slate-850' : 'border-slate-100'} pb-2 flex items-center gap-2`}>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{language === 'en' ? 'Security & Legal Compliance' : 'الأمان والامتثال القانوني'}</span>
          </h2>
          <ul className="space-y-3">
            {LEGAL_PAGES.map(page => (
              <li key={page.id} className="flex items-center gap-2">
                <page.icon className={`w-3.5 h-3.5 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                <button 
                  onClick={() => navigateTo(page.id)}
                  className={`text-xs font-bold hover:text-blue-400 text-left transition-colors cursor-pointer ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  {language === 'en' ? page.labelEn : page.labelAr}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Comprehensive List of Category Utilities */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/10 border-slate-850/80' : 'bg-white border-slate-200 shadow-sm'} space-y-6`} id="sitemap-utilities-box">
        <div className="border-b border-slate-800/10 dark:border-slate-800/40 pb-4">
          <h2 className={`text-lg font-black tracking-tight flex items-center gap-2.5 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            <Wrench className="w-5 h-5 text-blue-400" />
            <span>{language === 'en' ? 'Complete Utilities Directory' : 'دليل الأدوات والخدمات البرمجية والحاسبات'}</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-1">
            {language === 'en' 
              ? 'Below are all utility tools built to process 100% locally in browser memory for privacy.' 
              : 'جميع الأدوات تعمل داخل متصفحك بشكل آمن وخاص بنسبة 100% دون تخزين أو رفع لبياناتك.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="sitemap-tools-categories-grid">
          {CATEGORIES.map(cat => {
            const catTools = filteredTools.filter(t => t.category === cat.id);
            if (catTools.length === 0) return null;
            return (
              <div key={cat.id} className="space-y-3 border-r dark:border-slate-900 px-3">
                <div className="flex items-center gap-2">
                  <span className={`p-1.5 rounded-lg ${cat.color} inline-flex`}>
                    <cat.icon className="w-4 h-4" />
                  </span>
                  <h3 className={`text-xs font-black tracking-wide ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {language === 'en' ? cat.labelEn : cat.labelAr}
                  </h3>
                </div>

                <ul className="space-y-2.5 pl-2" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {catTools.map(tool => (
                    <li key={tool.id} className="text-[11px] leading-relaxed">
                      <button 
                        onClick={() => navigateTo('tools', tool.id)}
                        className={`font-semibold hover:text-blue-400 text-left transition-colors cursor-pointer block ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
                      >
                        {language === 'en' ? tool.name : tool.arabicName}
                        <span className={`text-[9px] text-slate-500 block font-normal`}>
                          {language === 'en' ? tool.description : tool.arabicDescription}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive List of 100 Knowledge Blog Articles */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/10 border-slate-850/80' : 'bg-white border-slate-200 shadow-sm'} space-y-6`} id="sitemap-knowledge-hub-box">
        <div className="border-b border-slate-800/10 dark:border-slate-800/40 pb-4">
          <h2 className={`text-lg font-black tracking-tight flex items-center gap-2.5 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>{language === 'en' ? 'Knowledge Hub & Professional Blog' : 'دليل مقالات المدونة والمعرفة الاحترافية (100 مقالة)'}</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-1">
            {language === 'en' 
              ? 'Complete list of 100 SEO-optimized, original technical articles explaining each digital tool in depth.' 
              : 'الفهرس الكامل لـ 100 مقالة تعليمية غنية وحقيقية لتقديم معلومات وشروحات لكل أداة بالتفصيل.'}
          </p>
        </div>

        {filteredBlogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" id="sitemap-blog-posts-list">
            {filteredBlogPosts.map((post, i) => (
              <div key={post.id} className="flex gap-2 text-[11px] leading-relaxed border-b dark:border-slate-850/30 pb-2">
                <span className="text-slate-500 font-mono select-none">{(i + 1).toString().padStart(3, '0')}.</span>
                <div>
                  <button 
                    onClick={() => navigateTo('blog-post', null, post.id)}
                    className={`font-semibold hover:text-blue-400 text-left transition-colors cursor-pointer block ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
                  >
                    {language === 'en' ? post.titleEn : post.titleAr}
                  </button>
                  <span className="text-[9px] text-slate-500 block">
                    {post.category} • {post.date} • {post.readTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-500">
            {language === 'en' ? 'No matching knowledge articles found' : 'لم نجد أي مقالة مطابقة لبحثك في المدونة'}
          </div>
        )}
      </div>
    </div>
  );
}
