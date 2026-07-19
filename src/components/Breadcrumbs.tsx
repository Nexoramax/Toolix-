import React from 'react';
import { Home, ChevronRight, ChevronLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

interface BreadcrumbsProps {
  language: 'en' | 'ar';
  darkMode: boolean;
  activeTab: string;
  selectedBlogPostId: string | null;
  navigateTo: (tab: any, toolId?: string | null, blogPostId?: string | null) => void;
}

export default function Breadcrumbs({ 
  language, 
  darkMode, 
  activeTab, 
  selectedBlogPostId, 
  navigateTo 
}: BreadcrumbsProps) {
  
  // If we are on Home page, breadcrumbs are not needed
  if (activeTab === 'home') return null;

  const isAr = language === 'ar';
  const Separator = () => (
    isAr ? <ChevronLeft className="w-3.5 h-3.5 text-slate-600 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
  );

  // Define bilingual labels for all tabs
  const tabLabels: Record<string, { en: string; ar: string }> = {
    'tools': { en: 'Tools Directory', ar: 'دليل الأدوات' },
    'favorites': { en: 'Saved Favorites', ar: 'الأدوات المفضلة' },
    'history': { en: 'Operations History', ar: 'سجل العمليات' },
    'settings': { en: 'Platform Settings', ar: 'إعدادات المنصة' },
    'about': { en: 'About Us', ar: 'من نحن وعن رسالتنا' },
    'mission': { en: 'Our Core Mission', ar: 'رسالتنا وأهدافنا' },
    'vision': { en: 'Strategic Vision', ar: 'رؤية المنصة' },
    'team': { en: 'Meet The Team', ar: 'فريق العمل والخبراء' },
    'story': { en: 'Our Story', ar: 'قصة تأسيس توليكس' },
    'support': { en: 'Support Center', ar: 'مركز الدعم والمساعدة' },
    'privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية وأمن البيانات' },
    'terms': { en: 'Terms of Service', ar: 'شروط الخدمة والاستخدام' },
    'cookie': { en: 'Cookie Policy', ar: 'سياسة ملفات تعريف الارتباط' },
    'disclaimer': { en: 'Legal Disclaimer', ar: 'إخلاء المسؤولية القانونية' },
    'contact': { en: 'Contact Support', ar: 'اتصل بنا والدعم الفني' },
    'status': { en: 'System Status Monitor', ar: 'حالة واستقرار النظام' },
    'sitemap': { en: 'HTML Sitemap', ar: 'خريطة الموقع التفاعلية' },
    'blog': { en: 'Knowledge Hub', ar: 'مدونة المعرفة والعلوم' },
    'blog-post': { en: 'Article Details', ar: 'تفاصيل المقال المعرفي' },
    '404': { en: 'Error 404', ar: 'الصفحة غير موجودة' }
  };

  const currentLabel = tabLabels[activeTab] || { en: 'Page', ar: 'صفحة' };

  // If we are on an active blog post, resolve its title
  let postTitle = '';
  if (activeTab === 'blog-post' && selectedBlogPostId) {
    const post = blogPosts.find(p => p.id === selectedBlogPostId);
    if (post) {
      postTitle = isAr ? post.titleAr : post.titleEn;
    }
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      dir={isAr ? 'rtl' : 'ltr'} 
      className="flex items-center flex-wrap gap-1.5 text-[11px] font-bold text-slate-400 px-1 py-2 mb-4 overflow-hidden border-b border-dashed border-slate-800/10 dark:border-slate-800/20"
      id="breadcrumbs-nav"
    >
      {/* 1. Home Link */}
      <button 
        onClick={() => navigateTo('home')}
        className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
        id="breadcrumb-home-btn"
      >
        <Home className="w-3.5 h-3.5" />
        <span>{isAr ? 'الرئيسية' : 'Home'}</span>
      </button>

      <Separator />

      {/* 2. Blog parent link if inside a post */}
      {activeTab === 'blog-post' ? (
        <>
          <button 
            onClick={() => navigateTo('blog')}
            className="hover:text-blue-400 transition-colors cursor-pointer"
            id="breadcrumb-blog-hub-btn"
          >
            {isAr ? tabLabels['blog'].ar : tabLabels['blog'].en}
          </button>
          
          <Separator />
          
          {/* Active Post Title */}
          <span className={`truncate max-w-[200px] sm:max-w-[400px] ${darkMode ? 'text-slate-200' : 'text-slate-800'}`} id="breadcrumb-post-title">
            {postTitle || (isAr ? 'مقال معرفي' : 'Knowledge Article')}
          </span>
        </>
      ) : (
        /* Active general page label */
        <span className={darkMode ? 'text-slate-200' : 'text-slate-800'} id="breadcrumb-current-label">
          {isAr ? currentLabel.ar : currentLabel.en}
        </span>
      )}
    </nav>
  );
}
